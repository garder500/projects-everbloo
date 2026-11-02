import ts from "typescript";
import path from "node:path";

export interface OutlineItem {
  name: string;
  kind: "function" | "class" | "interface" | "type" | "enum" | "const" | "method";
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
  const end = body ? body.getStart(sf) : node.getEnd();
  return sf.text.slice(node.getStart(sf), end).replace(/\s+/g, " ").trim().slice(0, 200);
}

const isExported = (n: ts.Node): boolean =>
  ts.canHaveModifiers(n) &&
  !!ts.getModifiers(n)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword || m.kind === ts.SyntaxKind.DefaultKeyword);

export function outline(file: string, content: string): OutlineItem[] {
  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, scriptKind(file));
  const line = (pos: number) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  const items: OutlineItem[] = [];
  const exportedNames = new Set<string>();

  for (const st of sf.statements) {
    if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
      st.exportClause.elements.forEach((e) => exportedNames.add((e.propertyName ?? e.name).text));
    }
    if (ts.isExportAssignment(st) && ts.isIdentifier(st.expression)) exportedNames.add(st.expression.text);
  }

  const base = (node: ts.Node, name: string, kind: OutlineItem["kind"], exp: boolean): OutlineItem => ({
    name,
    kind,
    signature: signatureOf(node, sf),
    start: line(node.getStart(sf)),
    end: line(node.getEnd()),
    exported: exp || exportedNames.has(name),
  });

  for (const st of sf.statements) {
    const exp = isExported(st);
    if (ts.isFunctionDeclaration(st)) {
      items.push(base(st, st.name?.text ?? "default", "function", exp));
    } else if (ts.isClassDeclaration(st)) {
      const item = base(st, st.name?.text ?? "default", "class", exp);
      item.children = st.members
        .filter((m): m is ts.MethodDeclaration => ts.isMethodDeclaration(m) && !!m.name)
        .map((m) => base(m, m.name.getText(sf), "method", false));
      items.push(item);
    } else if (ts.isInterfaceDeclaration(st)) {
      items.push(base(st, st.name.text, "interface", exp));
    } else if (ts.isTypeAliasDeclaration(st)) {
      items.push(base(st, st.name.text, "type", exp));
    } else if (ts.isEnumDeclaration(st)) {
      items.push(base(st, st.name.text, "enum", exp));
    } else if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (!ts.isIdentifier(d.name)) continue;
        const it = base(d, d.name.text, "const", exp);
        it.start = line(st.getStart(sf));
        it.end = line(st.getEnd());
        if (d.initializer && (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))) {
          it.kind = "function";
          it.signature = `const ${d.name.text} = ${signatureOf(d.initializer, sf)}`.slice(0, 200);
        } else {
          it.signature = it.signature.slice(0, 120);
        }
        items.push(it);
      }
    }
  }
  return items;
}

export function findItem(items: OutlineItem[], name: string): OutlineItem | undefined {
  for (const it of items) {
    if (it.name === name) return it;
    const child = it.children?.find((c) => c.name === name);
    if (child) return child;
  }
  return undefined;
}
