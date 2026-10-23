import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

const IDENTIFIER_VISITOR_KEYS = {
  [AST.ArrayExpression]: ["elements"],
  [AST.ArrayPattern]: ["elements"],
  [AST.AssignmentExpression]: ["left", "right"],
  [AST.AssignmentPattern]: ["left", "right"],
  [AST.AwaitExpression]: ["argument"],
  [AST.BinaryExpression]: ["left", "right"],
  [AST.CallExpression]: ["callee", "arguments"],
  [AST.ChainExpression]: ["expression"],
  [AST.ConditionalExpression]: ["test", "consequent", "alternate"],
  [AST.ForInStatement]: ["left", "right"],
  [AST.ForOfStatement]: ["left", "right"],
  [AST.ImportExpression]: ["source"],
  [AST.LogicalExpression]: ["left", "right"],
  [AST.MemberExpression]: ["object", "property"],
  [AST.NewExpression]: ["callee", "arguments"],
  [AST.ObjectExpression]: ["properties"],
  [AST.ObjectPattern]: ["properties"],
  [AST.Property]: ["value"],
  [AST.SequenceExpression]: ["expressions"],
  [AST.SpreadElement]: ["argument"],
  [AST.TaggedTemplateExpression]: ["tag", "quasi"],
  [AST.TemplateLiteral]: ["expressions"],
  [AST.TSAsExpression]: ["expression"],
  [AST.TSInstantiationExpression]: ["expression"],
  [AST.TSNonNullExpression]: ["expression"],
  [AST.TSSatisfiesExpression]: ["expression"],
  [AST.TSTypeAssertion]: ["expression"],
  [AST.UnaryExpression]: ["argument"],
  [AST.UpdateExpression]: ["argument"],
  [AST.YieldExpression]: ["argument"],
} as const;

/**
 * Get all nested identifiers in an expression-like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  simpleTraverse(node, {
    enter(node, parent) {
      if (node.type !== AST.Identifier) return;
      // Skip the property of a non-computed member access: `obj.prop` reads `obj`, not `prop`
      if (parent?.type === AST.MemberExpression && !parent.computed && parent.property === node) return;
      identifiers.push(node);
    },
    visitorKeys: IDENTIFIER_VISITOR_KEYS,
  });
  return identifiers;
}

/**
 * Check if a statement terminates the control flow of its block
 * (a `return`/`throw`, or a block containing one)
 * @param node The node to check
 * @returns `true` if the statement terminates the control flow
 */
export function isTerminatingStatement(node: TSESTree.Node): boolean {
  if (node.type === AST.ReturnStatement || node.type === AST.ThrowStatement) return true;
  if (node.type === AST.BlockStatement) return node.body.some(isTerminatingStatement);
  return false;
}
