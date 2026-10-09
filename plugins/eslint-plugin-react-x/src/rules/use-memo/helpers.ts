import { Check, Traverse } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

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

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  // If the node is not inside a function, boundary will be null
  // and no return statements will be collected (as expected)
  const boundary = Check.isFunction(node)
    ? node
    : Traverse.findParent(node, Check.isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST.ReturnStatement) {
        return;
      }
      if (Traverse.hasParent(node, Check.isFunction, (n) => n === boundary)) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}
