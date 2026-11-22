import ts from "typescript";

/**
 * Get the fully qualified name of a symbol, handling cases that `ts.TypeChecker.getFullyQualifiedName` does not handle (ex: `export as namespace preact`).
 * @param checker The TypeScript type checker.
 * @param symbol The symbol to get fully qualified name for.
 * @returns The fully qualified name of the symbol.
 * @remarks
 * Known approximations:
 * - Symbols declared in a file with `export as namespace X` get the `X.` prefix even when they are not exported; this is deliberate for allow-list matching.
 * - For symbols with merged declarations across files, the first declaration determines the source file used for the namespace lookup.
 */
export function getFullyQualifiedNameEx(checker: ts.TypeChecker, symbol: ts.Symbol) {
  let name = symbol.name;
  let parent = symbol.declarations?.at(0)?.parent;
  if (parent == null) return checker.getFullyQualifiedName(symbol);
  // Whether the ancestor chain passed through a `declare global { ... }` augmentation
  let inGlobalAugmentation = false;
  while (!ts.isSourceFile(parent)) {
    switch (true) {
      case ts.isInterfaceDeclaration(parent):
      case ts.isTypeAliasDeclaration(parent):
      case ts.isEnumDeclaration(parent):
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isModuleDeclaration(parent): {
        // `declare global { ... }` augmentations contribute to the global scope, not to any module namespace
        if ((parent.flags & ts.NodeFlags.GlobalAugmentation) !== 0) {
          inGlobalAugmentation = true;
          break;
        }
        name = `${parent.name.text}.${name}`;
        break;
      }
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
      case ts.isVariableDeclaration(parent)
        && ts.isIdentifier(parent.name):
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isFunctionDeclaration(parent)
        && parent.name != null:
      case ts.isFunctionExpression(parent)
        && parent.name != null:
      case ts.isClassExpression(parent)
        && parent.name != null:
      case ts.isClassDeclaration(parent)
        && parent.name != null:
        name = `${parent.name.text}.${name}`;
        break;
      case ts.isEnumMember(parent)
        && !ts.isComputedPropertyName(parent.name):
        name = `${parent.name.text}.${name}`;
        break;
      // Skip unnamed structural type nodes (they don't contribute a name segment)
      case ts.isTypeLiteralNode(parent):
      case ts.isMappedTypeNode(parent):
      case ts.isObjectLiteralExpression(parent):
      case ts.isIntersectionTypeNode(parent):
      case ts.isUnionTypeNode(parent):
        break;
      default:
        break;
    }
    parent = parent.parent;
  }
  // Find the top-level namespace export declaration like `export as namespace preact;`
  const namespace = parent.statements.find((n) => ts.isNamespaceExportDeclaration(n))?.name.text;
  // If there's no namespace export declaration, return the name as is. Otherwise, prepend the namespace to the name.
  // Symbols from `declare global { ... }` augmentations live in the global scope, outside the UMD namespace.
  if (namespace == null || inGlobalAugmentation) return name;
  // Avoid duplicating the namespace when the name is the namespace itself or is already qualified by it.
  if (name === namespace || name.startsWith(`${namespace}.`)) return name;
  return `${namespace}.${name}`;
}
