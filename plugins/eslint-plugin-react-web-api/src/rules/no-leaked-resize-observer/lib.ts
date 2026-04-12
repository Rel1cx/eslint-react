import { isOneOf } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";

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
