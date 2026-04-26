import { Check, Traverse } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

export function isInsideNestedFunction(
  node: TSESTree.Node,
  boundary: TSESTree.FunctionLike,
): boolean {
  let current = node.parent;
  while (current && current !== boundary) {
    if (Check.isFunction(current)) return true;
    current = current.parent;
  }
  return false;
}

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  // If the node is not inside a function, boundaryNode will be null
  // and no return statements will be collected (as expected)
  const boundaryNode = Check.isFunction(node)
    ? node
    : Traverse.findParent(node, Check.isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST.ReturnStatement) {
        return;
      }
      const parentFunction = Traverse.findParent(node, Check.isFunction);
      if (parentFunction !== boundaryNode) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}
