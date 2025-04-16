import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { findParentNode } from "./ast-hierarchy";
import { isFunction } from "./ast-is";

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  const boundaryNode = isFunction(node)
    ? node
    : findParentNode(node, isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== T.ReturnStatement) {
        return;
      }
      const parentFunction = findParentNode(node, isFunction);
      if (parentFunction !== boundaryNode) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}
