import ts from "typescript";
import path from "node:path";

export interface OutlineItem {
  name: string;
  kind: "function" | "class" | "interface" | "type" | "enum" | "const" | "method" | "namespace";
  signature: string;
  start: number;
  end: number;
  exported: boolean;
  children?: OutlineItem[];
}

function scriptKind(file: string): ts.ScriptKind {
  switch (path.extname(file).toLowerCase()) {
    case ".tsx": return ts.ScriptKind.TSX;
    case ".jsx": return ts.ScriptKind.JSX;
    case ".ts": return ts.ScriptKind.TS;
    default: return ts.ScriptKind.JS;
  }
}

/** Signature = déclaration sans corps, sur une ligne. */
function signatureOf(node: ts.Node, sf: ts.SourceFile): string {
  const body = (node as { body?: ts.Node }).body;
  let end = body ? body.getStart(sf) : node.getEnd();
  // classe / interface / enum : l'en-tête s'arrête à l'accolade ouvrante (sinon on coupe le corps en plein mot)
  if (!body && (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node))) {
    const brace = sf.text.indexOf("{", node.getStart(sf));
    if (brace >= 0 && brace < end) end = brace;
  }
  const sig = sf.text.slice(node.getStart(sf), end).replace(/\s+/g, " ").trim();
  return sig.length > 200 ? `${sig.slice(0, 197)}…` : sig;
}

const isExported = (n: ts.Node): boolean =>
  ts.canHaveModifiers(n) &&
  !!ts.getModifiers(n)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword || m.kind === ts.SyntaxKind.DefaultKeyword);

const isFn = (n: ts.Node | undefined): n is ts.ArrowFunction | ts.FunctionExpression => !!n && (ts.isArrowFunction(n) || ts.isFunctionExpression(n));

/** `module.exports`, `exports` ou `module.exports.x` / `exports.x` : renvoie le nom exporté (undefined pour module.exports lui-même, "" si ce n'est pas un export CJS). */
function cjsTarget(left: ts.Expression): string | undefined {
  const text = left.getText();
  if (text === "module.exports" || text === "exports") return undefined;
  const m = /^(?:module\.)?exports\.(\w+)$/.exec(text);
  return m ? m[1] : "";
}

export function outline(file: string, content: string): OutlineItem[] {
  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, scriptKind(file));
  const line = (pos: number) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  const items: OutlineItem[] = [];
  const exportedNames = new Set<string>();
  const wrappers: ts.Statement[][] = []; // corps de factories `module.exports = (a, b) => { ... }` (modèles Sequelize…)

  const scanExports = (st: ts.Statement) => {
    if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
      st.exportClause.elements.forEach((e) => exportedNames.add((e.propertyName ?? e.name).text));
    }
    if (ts.isExportAssignment(st)) {
      if (ts.isIdentifier(st.expression)) exportedNames.add(st.expression.text);
      if (isFn(st.expression) && ts.isBlock(st.expression.body)) wrappers.push([...st.expression.body.statements]);
    }
    if (ts.isExpressionStatement(st) && ts.isBinaryExpression(st.expression) && st.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const { left, right } = st.expression;
      const target = cjsTarget(left);
      if (target === "") return;
      if (target) {
        exportedNames.add(target);
        if (ts.isIdentifier(right)) exportedNames.add(right.text);
      } else if (ts.isIdentifier(right)) {
        exportedNames.add(right.text);
      } else if (ts.isObjectLiteralExpression(right)) {
        for (const p of right.properties) {
          if (ts.isShorthandPropertyAssignment(p)) exportedNames.add(p.name.text);
          else if (ts.isPropertyAssignment(p)) {
            if (ts.isIdentifier(p.name)) exportedNames.add(p.name.text);
            if (ts.isIdentifier(p.initializer)) exportedNames.add(p.initializer.text);
          }
        }
      } else if (isFn(right) && ts.isBlock(right.body)) {
        wrappers.push([...right.body.statements]);
      }
    }
  };
  sf.statements.forEach(scanExports);

  const base = (node: ts.Node, name: string, kind: OutlineItem["kind"], exp: boolean): OutlineItem => ({
    name,
    kind,
    signature: signatureOf(node, sf),
    start: line(node.getStart(sf)),
    end: line(node.getEnd()),
    exported: exp || exportedNames.has(name),
  });

  const collect = (statements: readonly ts.Statement[], wrapped: boolean) => {
    for (const st of statements) {
      const exp = isExported(st);
      if (ts.isFunctionDeclaration(st)) {
        items.push(base(st, st.name?.text ?? "default", "function", exp));
      } else if (ts.isClassDeclaration(st)) {
        // une classe dans une factory est ce que le module fournit (ex. modèle Sequelize) : exportée
        const item = base(st, st.name?.text ?? "default", "class", exp || wrapped);
        item.children = st.members
          .filter((m): m is ts.MethodDeclaration => ts.isMethodDeclaration(m) && !!m.name)
          .map((m) => base(m, sf.text.slice(m.name.getStart(sf), m.name.getEnd()), "method", false));
        items.push(item);
      } else if (ts.isInterfaceDeclaration(st)) {
        items.push(base(st, st.name.text, "interface", exp));
      } else if (ts.isTypeAliasDeclaration(st)) {
        items.push(base(st, st.name.text, "type", exp));
      } else if (ts.isEnumDeclaration(st)) {
        items.push(base(st, st.name.text, "enum", exp));
      } else if (ts.isModuleDeclaration(st) && st.body && ts.isModuleBlock(st.body)) {
        // `declare namespace X { … }` (fichiers .d.ts) : le namespace puis son contenu
        items.push(base(st, st.name.getText(sf), "namespace", exp));
        collect(st.body.statements, wrapped);
      } else if (ts.isVariableStatement(st)) {
        for (const d of st.declarationList.declarations) {
          if (!ts.isIdentifier(d.name)) continue;
          const it = base(d, d.name.text, "const", exp);
          it.start = line(st.getStart(sf));
          it.end = line(st.getEnd());
          if (isFn(d.initializer)) {
            it.kind = "function";
            it.signature = `const ${d.name.text} = ${signatureOf(d.initializer, sf)}`.slice(0, 200);
          } else {
            it.signature = it.signature.slice(0, 120);
          }
          items.push(it);
        }
      }
    }
  };

  collect(sf.statements, false);
  wrappers.forEach((w) => collect(w, true));
  return items.sort((a, b) => a.start - b.start);
}

export function findItem(items: OutlineItem[], name: string): OutlineItem | undefined {
  // « Classe.méthode » : la méthode de cette classe précisément
  const [cls, method] = name.split(".");
  if (method) return items.find((i) => i.name === cls)?.children?.find((c) => c.name === method);
  for (const it of items) {
    if (it.name === name) return it;
    const child = it.children?.find((c) => c.name === name);
    if (child) return child;
  }
  return undefined;
}
