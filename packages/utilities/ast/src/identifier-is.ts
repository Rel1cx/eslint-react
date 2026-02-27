import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Check if the given node is an identifier
 * @param node The node to check
 * @param name The name to check
 * @returns True if the node is an identifier, false otherwise
 */
export function isIdentifier(node: TSESTree.Node | null | unit, name?: string): node is TSESTree.Identifier {
  return node != null
    && node.type === AST.Identifier
    && (name == null || node.name === name);
}
