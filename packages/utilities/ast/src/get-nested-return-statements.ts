import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { isFunction } from "./is";
import { traverseUpGuard } from "./traverse-up-guard";
import { NodeType } from "./types";

/**
 * Gets nested return statements in a node
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const returnStatements: TSESTree.ReturnStatement[] = [];
  const functionNode = O.getOrNull(traverseUpGuard(node, isFunction));
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== NodeType.ReturnStatement) return;
      const parentFunction = O.getOrNull(traverseUpGuard(node, isFunction));
      if (parentFunction && parentFunction !== functionNode) return;
      returnStatements.push(node);
    },
  });
  return returnStatements;
}
