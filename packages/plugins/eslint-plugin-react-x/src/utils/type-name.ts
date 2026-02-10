import ts from "typescript";

/**
 * An enhanced version of getFullyQualifiedName that handles cases that original function does not handle
 * @param checker TypeScript type checker
 * @param symbol Symbol to get fully qualified name for
 * @returns Fully qualified name of the symbol
 */
export function getFullyQualifiedNameEx(checker: ts.TypeChecker, symbol: ts.Symbol) {
  let name = symbol.name;
  let parent = symbol.declarations?.at(0)?.parent;
  if (parent == null) return checker.getFullyQualifiedName(symbol);
  // Find the top-level namespace export declaration like `export as namespace preact;`
  const namespace = parent.getSourceFile().statements.find((n) => ts.isNamespaceExportDeclaration(n));
  while (parent.kind !== ts.SyntaxKind.SourceFile) {
    switch (true) {
      case ts.isInterfaceDeclaration(parent):
      case ts.isTypeAliasDeclaration(parent):
      case ts.isEnumDeclaration(parent):
      case ts.isModuleDeclaration(parent):
      case ts.isNamespaceImport(parent):
      case ts.isNamespaceExport(parent):
      case ts.isNamespaceExportDeclaration(parent):
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isPropertySignature(parent)
        && ts.isIdentifier(parent.name):
      case ts.isPropertyDeclaration(parent)
        && ts.isIdentifier(parent.name):
      case ts.isMethodDeclaration(parent)
        && ts.isIdentifier(parent.name):
      case ts.isMethodSignature(parent)
        && ts.isIdentifier(parent.name):
      case ts.isPropertyAssignment(parent)
        && ts.isIdentifier(parent.name):
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isFunctionDeclaration(parent)
        && parent.name != null:
      case ts.isClassExpression(parent)
        && parent.name != null:
      case ts.isClassDeclaration(parent)
        && parent.name != null:
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isEnumMember(parent):
        name = `${parent.name.getText()}.${name}`;
        break;
      // Skip unnamed structural type nodes (they don't contribute a name segment)
      case ts.isTypeLiteralNode(parent):
      case ts.isMappedTypeNode(parent):
      case ts.isObjectLiteralExpression(parent):
      case ts.isIntersectionTypeNode(parent):
      case ts.isUnionTypeNode(parent):
        break;
    }
    parent = parent.parent;
  }
  if (namespace != null) return `${namespace.name.text}.${name}`;
  return name;
}
