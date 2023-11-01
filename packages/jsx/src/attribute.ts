import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if node is like `key={...}` as in `<Foo key={...} />`
 * @param node The AST node to check
 * @returns `true` if the node is like `key={...}`
 */
export function isJSXAttributeKey(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.JSXAttribute
    && node.name.type === AST_NODE_TYPES.JSXIdentifier
    && node.name.name === "key";
}
