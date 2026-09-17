import ts from "typescript";
import path from "node:path";

export interface ExtractedSymbol {
  name: string;
  kind: "function" | "class" | "interface" | "type" | "enum" | "variable" | "export" | "other";
  signature: string;
  lineStart: number;
  lineEnd: number;
  isExported: boolean;
}

export function parseSourceSymbols(filePath: string, content: string): ExtractedSymbol[] {
  const ext = path.extname(filePath).toLowerCase();
  const isJsTs = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"].includes(ext);

  if (!isJsTs) {
    return parseGenericTextSymbols(content);
  }

  const scriptKind =
    ext === ".tsx"
      ? ts.ScriptKind.TSX
      : ext === ".jsx"
      ? ts.ScriptKind.JSX
      : ext === ".ts"
      ? ts.ScriptKind.TS
      : ts.ScriptKind.JS;

  let sourceFile: ts.SourceFile;
  try {
    sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true,
      scriptKind
    );
  } catch {
    return parseGenericTextSymbols(content);
  }

  const symbols: ExtractedSymbol[] = [];
  const lines = content.split(/\r?\n/);

  function getLineNumber(pos: number): number {
    return sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
  }

  function getSignatureText(startLine: number, endLine: number): string {
    const rawLine = lines[startLine - 1] || "";
    return rawLine.trim();
  }

  function hasExportModifier(node: ts.Node): boolean {
    if (ts.canHaveModifiers(node)) {
      const modifiers = ts.getModifiers(node);
      if (modifiers) {
        return modifiers.some(
          (m) =>
            m.kind === ts.SyntaxKind.ExportKeyword ||
            m.kind === ts.SyntaxKind.DefaultKeyword
        );
      }
    }
    return false;
  }

  function visit(node: ts.Node) {
    // 1. Function declaration
    if (ts.isFunctionDeclaration(node)) {
      const name = node.name ? node.name.text : "default";
      const startLine = getLineNumber(node.getStart(sourceFile));
      const endLine = getLineNumber(node.getEnd());
      symbols.push({
        name,
        kind: "function",
        signature: getSignatureText(startLine, endLine),
        lineStart: startLine,
        lineEnd: endLine,
        isExported: hasExportModifier(node),
      });
    }

    // 2. Class declaration
    else if (ts.isClassDeclaration(node)) {
      const name = node.name ? node.name.text : "AnonymousClass";
      const startLine = getLineNumber(node.getStart(sourceFile));
      const endLine = getLineNumber(node.getEnd());
      symbols.push({
        name,
        kind: "class",
        signature: getSignatureText(startLine, endLine),
        lineStart: startLine,
        lineEnd: endLine,
        isExported: hasExportModifier(node),
      });

      // Extract class methods
      for (const member of node.members) {
        if (ts.isMethodDeclaration(member) && member.name && ts.isIdentifier(member.name)) {
          const methodName = member.name.text;
          const methodStart = getLineNumber(member.getStart(sourceFile));
          const methodEnd = getLineNumber(member.getEnd());
          symbols.push({
            name: `${name}.${methodName}`,
            kind: "function",
            signature: getSignatureText(methodStart, methodEnd),
            lineStart: methodStart,
            lineEnd: methodEnd,
            isExported: hasExportModifier(node),
          });
        }
      }
    }

    // 3. Interface declaration
    else if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text;
      const startLine = getLineNumber(node.getStart(sourceFile));
      const endLine = getLineNumber(node.getEnd());
      symbols.push({
        name,
        kind: "interface",
        signature: getSignatureText(startLine, endLine),
        lineStart: startLine,
        lineEnd: endLine,
        isExported: hasExportModifier(node),
      });
    }

    // 4. Type alias declaration
    else if (ts.isTypeAliasDeclaration(node)) {
      const name = node.name.text;
      const startLine = getLineNumber(node.getStart(sourceFile));
      const endLine = getLineNumber(node.getEnd());
      symbols.push({
        name,
        kind: "type",
        signature: getSignatureText(startLine, endLine),
        lineStart: startLine,
        lineEnd: endLine,
        isExported: hasExportModifier(node),
      });
    }

    // 5. Enum declaration
    else if (ts.isEnumDeclaration(node)) {
      const name = node.name.text;
      const startLine = getLineNumber(node.getStart(sourceFile));
      const endLine = getLineNumber(node.getEnd());
      symbols.push({
        name,
        kind: "enum",
        signature: getSignatureText(startLine, endLine),
        lineStart: startLine,
        lineEnd: endLine,
        isExported: hasExportModifier(node),
      });
    }

    // 6. Variable statements (const x = ..., const fn = () => ..., etc.)
    else if (ts.isVariableStatement(node)) {
      const isExported = hasExportModifier(node);
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const varName = decl.name.text;
          const startLine = getLineNumber(decl.getStart(sourceFile));
          const endLine = getLineNumber(decl.getEnd());

          let kind: ExtractedSymbol["kind"] = "variable";
          if (
            decl.initializer &&
            (ts.isArrowFunction(decl.initializer) ||
              ts.isFunctionExpression(decl.initializer))
          ) {
            kind = "function";
          }

          symbols.push({
            name: varName,
            kind,
            signature: getSignatureText(startLine, endLine),
            lineStart: startLine,
            lineEnd: endLine,
            isExported,
          });
        }
      }
    }

    // 7. CommonJS / Expression statements (module.exports = ..., exports.foo = ...)
    else if (ts.isExpressionStatement(node)) {
      const expr = node.expression;
      if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        const left = expr.left;
        const right = expr.right;

        // module.exports = { a, b, c }
        if (
          ts.isPropertyAccessExpression(left) &&
          ts.isIdentifier(left.expression) &&
          left.expression.text === "module" &&
          left.name.text === "exports"
        ) {
          if (ts.isObjectLiteralExpression(right)) {
            for (const prop of right.properties) {
              let exportName = "";
              let lineStart = getLineNumber(prop.getStart(sourceFile));
              let lineEnd = getLineNumber(prop.getEnd());

              if (ts.isShorthandPropertyAssignment(prop)) {
                exportName = prop.name.text;
              } else if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                exportName = prop.name.text;
              } else if (ts.isMethodDeclaration(prop) && ts.isIdentifier(prop.name)) {
                exportName = prop.name.text;
              }

              if (exportName) {
                symbols.push({
                  name: exportName,
                  kind: "export",
                  signature: getSignatureText(lineStart, lineEnd),
                  lineStart,
                  lineEnd,
                  isExported: true,
                });
              }
            }
          } else if (ts.isIdentifier(right)) {
            const startLine = getLineNumber(node.getStart(sourceFile));
            symbols.push({
              name: right.text,
              kind: "export",
              signature: getSignatureText(startLine, startLine),
              lineStart,
              lineEnd: startLine,
              isExported: true,
            });
          }
        }

        // exports.foo = ...
        else if (
          ts.isPropertyAccessExpression(left) &&
          ts.isIdentifier(left.expression) &&
          left.expression.text === "exports"
        ) {
          const exportName = left.name.text;
          const startLine = getLineNumber(node.getStart(sourceFile));
          const endLine = getLineNumber(node.getEnd());
          symbols.push({
            name: exportName,
            kind: "export",
            signature: getSignatureText(startLine, endLine),
            lineStart,
            lineEnd,
            isExported: true,
          });
        }
      }
    }

    // 8. ES Module export declarations (export { foo, bar })
    else if (ts.isExportDeclaration(node)) {
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const spec of node.exportClause.elements) {
          const name = spec.name.text;
          const startLine = getLineNumber(spec.getStart(sourceFile));
          symbols.push({
            name,
            kind: "export",
            signature: getSignatureText(startLine, startLine),
            lineStart,
            lineEnd: startLine,
            isExported: true,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return deduplicateSymbols(symbols);
}

function parseGenericTextSymbols(content: string): ExtractedSymbol[] {
  const symbols: ExtractedSymbol[] = [];
  const lines = content.split(/\r?\n/);

  const GENERIC_PATTERNS = [
    { kind: "function" as const, regex: /def\s+([a-zA-Z0-9_]+)\s*\(/ },
    { kind: "function" as const, regex: /func\s+([a-zA-Z0-9_]+)\s*\(/ },
    { kind: "function" as const, regex: /fn\s+([a-zA-Z0-9_]+)\s*\(/ },
    { kind: "class" as const, regex: /class\s+([a-zA-Z0-9_]+)/ },
    { kind: "type" as const, regex: /struct\s+([a-zA-Z0-9_]+)/ },
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const p of GENERIC_PATTERNS) {
      const match = line.match(p.regex);
      if (match && match[1]) {
        symbols.push({
          name: match[1],
          kind: p.kind,
          signature: line.trim(),
          lineStart: i + 1,
          lineEnd: i + 1,
          isExported: false,
        });
        break;
      }
    }
  }

  return symbols;
}

function deduplicateSymbols(symbols: ExtractedSymbol[]): ExtractedSymbol[] {
  const seen = new Set<string>();
  const result: ExtractedSymbol[] = [];

  for (const s of symbols) {
    const key = `${s.name}|${s.kind}|${s.lineStart}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(s);
    }
  }

  return result;
}
