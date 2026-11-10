import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Check from "./check";
import type { TSESTreeTypeOrChainExpression } from "./tree";

// Expression normalization

/**
 * Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.
 * @param node The node to unwrap.
 * @returns The innermost non-wrapper node (`ChainExpression` and type expressions are stripped) — a reference into the original tree, never a copy.
 */
export function unwrap(node: TSESTreeTypeOrChainExpression): Exclude<TSESTree.Expression, TSESTreeTypeOrChainExpression>;
export function unwrap<T extends TSESTree.Node>(node: T): Exclude<T, TSESTreeTypeOrChainExpression>;
export function unwrap(node: TSESTree.Node): TSESTree.Node {
  if (Check.isTypeOrChainExpression(node)) {
    return unwrap(node.expression);
  }
  return node;
}

// Name extraction

/**
 * Get the flattened name of a JSX identifier, namespaced name, or member expression.
 * @param node The JSX name node.
 * @returns The flattened JSX name (ex: `"Foo.Bar"`, `"xml:space"`).
 */
export function getJSXName(node: TSESTree.JSXIdentifier | TSESTree.JSXNamespacedName | TSESTree.JSXMemberExpression): string {
  switch (node.type) {
    case AST.JSXIdentifier:
      return node.name;
    case AST.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case AST.JSXMemberExpression:
      return `${getJSXName(node.object)}.${getJSXName(node.property)}`;
  }
}

/**
 * Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed.
 * @param node The node to inspect.
 * @param getText A function returning the source text of a node.
 * @returns The fully qualified name.
 */
export function getFullyQualifiedName(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  const expr = unwrap(node);
  switch (expr.type) {
    case AST.Identifier:
      return expr.name;
    case AST.PrivateIdentifier:
      return `#${expr.name}`;
    case AST.JSXIdentifier:
    case AST.JSXMemberExpression:
    case AST.JSXNamespacedName:
      return getJSXName(expr);
    case AST.MemberExpression: {
      if (expr.computed) return getText(expr);
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    }
    case AST.JSXText:
      return expr.value;
    case AST.Literal:
      return expr.raw;
    default:
      return getText(expr);
  }
}

/**
 * Get the name of the callee of a call expression.
 * @param node The call expression to inspect.
 * @returns The callee name (ex: `"useState"`), or `null` for computed member expressions and other unsupported callee forms.
 */
export function getCalleeName(node: TSESTree.CallExpression): string | null {
  const callee = unwrap(node.callee);
  if (Check.isIdentifier(callee)) {
    return callee.name;
  }
  if (callee.type === AST.MemberExpression && !callee.computed && Check.isIdentifier(callee.property)) {
    return callee.property.name;
  }
  return null;
}
