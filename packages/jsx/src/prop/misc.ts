import { isStringLiteral, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { traverseUpProp } from "./traverse";

/**
 * Checks if the node is inside a prop's value
 * @param node The AST node to check
 * @returns `true` if the node is inside a prop's value
 */
export function isInsidePropValue(node: TSESTree.Node): boolean {
  if (isStringLiteral(node)) {
    return node.parent.type === NodeType.JSXAttribute;
  }

  return O.isSome(traverseUpProp(node, n => n.value?.type === NodeType.JSXExpressionContainer));
}
