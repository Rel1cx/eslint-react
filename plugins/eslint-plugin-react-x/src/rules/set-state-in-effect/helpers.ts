import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
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
 * Get all nested identifiers in a expression like node
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

export function isHookDecl(node: TSESTree.Node): node is TSESTree.VariableDeclarator & { init: TSESTree.CallExpression } {
  if (node.type !== AST.VariableDeclarator) return false;
  if (!Check.isIdentifier(node.id)) return false;
  const init = node.init;
  if (init == null || init.type !== AST.CallExpression) return false;
  const name = Extract.getCalleeName(init);
  return name != null && core.isHookName(name);
}

export function isThenCall(node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.MemberExpression
    && Extract.getCalleeName(node) === "then";
}

export function isTerminatingStatement(node: TSESTree.Node): boolean {
  if (node.type === AST.ReturnStatement || node.type === AST.ThrowStatement) return true;
  if (node.type === AST.BlockStatement) return node.body.some(isTerminatingStatement);
  return false;
}

/**
 * Get the display name of a setState call reference for reporting.
 * @param node The setState call node (CallExpression or Identifier)
 * @param getText The source text getter
 * @returns The fully qualified name of the call
 */
export function getCallName(node: TSESTree.CallExpression | TSESTree.Identifier, getText: (node: TSESTree.Node) => string) {
  if (node.type === AST.CallExpression) {
    return Extract.getFullyQualifiedName(node.callee, getText);
  }
  return Extract.getFullyQualifiedName(node, getText);
}

/**
 * Get the actual CallExpression node from a setState call reference.
 * When the node is an Identifier that is the callee of a CallExpression,
 * returns the parent CallExpression; otherwise returns the node itself.
 * @param node The setState call node (CallExpression or Identifier)
 * @returns The actual CallExpression node
 */
export function getSetStateCallExpression(node: TSESTree.CallExpression | TSESTree.Identifier): TSESTree.CallExpression | TSESTree.Identifier {
  return Check.isIdentifier(node) && node.parent.type === AST.CallExpression && node.parent.callee === node
    ? node.parent
    : node;
}
