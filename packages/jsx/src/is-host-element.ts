import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a node is a host (intrinsic / DOM) element.
 *
 * A host element is a `JSXElement` whose tag name is a plain `JSXIdentifier`
 * starting with a lowercase letter, the same heuristic React uses to
 * distinguish `<div>` from `<MyComponent>`.
 * @param node The AST node to test.
 * @returns `true` when the node is a `JSXElement` with a lowercase tag name.
 */
export function isHostElement(node: TSESTree.Node): node is TSESTree.JSXElement {
  if (node.type !== AST.JSXElement) return false;
  const name = node.openingElement.name;
  if (name.type === AST.JSXIdentifier) {
    return /^[a-z]/u.test(name.name);
  }
  if (name.type === AST.JSXNamespacedName) {
    return /^[a-z]/u.test(name.name.name);
  }
  return false;
}
