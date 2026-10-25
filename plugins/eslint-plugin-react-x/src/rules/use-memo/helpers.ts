import { Check } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether the result of a `useMemo` call is used (assigned, returned,
 * passed as an argument, etc.) rather than discarded as a bare statement.
 * @param node The `useMemo` call expression
 * @returns `true` when the call result flows into a surrounding expression
 */
export function isResultUsed(node: TSESTree.CallExpression): boolean {
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  return parent.type === AST.VariableDeclarator
    || parent.type === AST.AssignmentExpression
    || parent.type === AST.AssignmentPattern
    || parent.type === AST.Property
    || parent.type === AST.ReturnStatement
    || parent.type === AST.JSXExpressionContainer
    || parent.type === AST.CallExpression
    || parent.type === AST.NewExpression
    || parent.type === AST.ArrayExpression
    || parent.type === AST.ConditionalExpression
    || parent.type === AST.LogicalExpression
    || parent.type === AST.SequenceExpression
    || parent.type === AST.SpreadElement
    || parent.type === AST.TemplateLiteral
    || parent.type === AST.BinaryExpression
    || parent.type === AST.UnaryExpression
    || parent.type === AST.MemberExpression
    || parent.type === AST.TaggedTemplateExpression
    || parent.type === AST.ChainExpression
    || parent.type === AST.ArrowFunctionExpression
    || parent.type === AST.ForOfStatement
    || parent.type === AST.ForInStatement;
}
