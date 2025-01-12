import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { findParentNodeGuard } from "./find-parent-node-guard";
import { isFunction } from "./is";

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const returnStatements: TSESTree.ReturnStatement[] = [];
  const functionNode = isFunction(node)
    ? node
    : findParentNodeGuard(node, isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== T.ReturnStatement) {
        return;
      }
      const parentFunction = findParentNodeGuard(node, isFunction);
      if (parentFunction !== functionNode) {
        return;
      }
      returnStatements.push(node);
    },
  });
  return returnStatements;
}
