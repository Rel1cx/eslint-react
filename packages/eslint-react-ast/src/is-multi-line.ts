import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check if a node is multiline
 * @param node
 * @returns  `true` if the node is multiline
 */
export function isMultiLine(node: TSESTree.Node) {
    return node.loc.start.line !== node.loc.end.line;
}
