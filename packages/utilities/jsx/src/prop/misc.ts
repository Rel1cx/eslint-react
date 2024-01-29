import { isStringLiteral, NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";

import { traverseUpProp } from "./traverse";

/**
 * Checks if the node is inside a prop's value
 * @param node The AST node to check
 * @returns `true` if the node is inside a prop's value
 */
export function isInsidePropValue(node: TSESTree.Node): boolean {
  if (isStringLiteral(node)) return node.parent.type === NodeType.JSXAttribute;

  return O.isSome(traverseUpProp(node, n => n.value?.type === NodeType.JSXExpressionContainer));
}
