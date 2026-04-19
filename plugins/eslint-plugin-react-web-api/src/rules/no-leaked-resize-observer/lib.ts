import { Extract, isOneOf } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a node is a loop statement
 * @param node The node to check
 * @returns True if the node is a loop
 */
export const isLoop = isOneOf([
  AST.DoWhileStatement,
  AST.ForInStatement,
  AST.ForOfStatement,
  AST.ForStatement,
  AST.WhileStatement,
]);

/**
 * Check if a node is a conditional expression or control flow statement
 * @param node The node to check
 * @returns True if the node is conditional
 */
export const isConditional = isOneOf([
  AST.DoWhileStatement,
  AST.ForInStatement,
  AST.ForOfStatement,
  AST.ForStatement,
  AST.WhileStatement,
  AST.IfStatement,
  AST.SwitchStatement,
  AST.LogicalExpression,
  AST.ConditionalExpression,
]);

export function isNewResizeObserver(node: TSESTree.Node | null) {
  if (node?.type !== AST.NewExpression) return false;
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.Identifier
    && callee.name === "ResizeObserver";
}

export function isFromObserver(context: RuleContext, node: TSESTree.Expression): boolean {
  switch (true) {
    case node.type === AST.Identifier: {
      const initNode = resolve(context, node);
      const unwrapped = initNode == null ? null : Extract.unwrap(initNode);
      return isNewResizeObserver(unwrapped);
    }
    case node.type === AST.MemberExpression:
      return isFromObserver(context, node.object);
    default:
      return false;
  }
}
