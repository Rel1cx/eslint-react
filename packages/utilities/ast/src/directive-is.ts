import type { TSESTree } from "@typescript-eslint/types";

import { isDirectiveName } from "./directive-name";
import { isLiteral } from "./literal";

/**
 * Check if a node is a directive
 * @param node The node to check
 * @returns True if the node is a directive, false otherwise
 */
export function isDirective(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return isLiteral(node, "string") && isDirectiveName(node.value);
}
