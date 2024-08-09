import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { isFunction } from "./is";
import { traverseUpGuard } from "./traverse-up-guard";

/**
 * Gets the nested call expressions in the node that are within the same function (if has one)
 * @param node The AST node
 * @returns The nested call expressions in the node
 */
export function getNestedCallExpressions(node: TSESTree.Node): readonly TSESTree.CallExpression[] {
  const callExpressions: TSESTree.CallExpression[] = [];
  const functionNode = isFunction(node) ? node : O.getOrNull(traverseUpGuard(node, isFunction));
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST_NODE_TYPES.CallExpression) return;
      const parentFunction = O.getOrNull(traverseUpGuard(node, isFunction));
      if (parentFunction && parentFunction !== functionNode) return;
      callExpressions.push(node);
    },
  });
  return callExpressions;
}
