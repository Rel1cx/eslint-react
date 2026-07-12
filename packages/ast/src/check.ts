import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";
import type { TSESTreeDirective } from "./types";

// Base guards
export const is = ASTUtils.isNodeOfType;
export const isOneOf = ASTUtils.isNodeOfTypes;

// Directive check
export function isDirective(node: TSESTree.Node, name?: string): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && (name == null || node.directive === name);
}

// Identifier check
export function isIdentifier(node: TSESTree.Node, name?: string): node is TSESTree.Identifier {
  return node.type === AST.Identifier && (name == null || node.name === name);
}

// Composite type guards

export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

export const isProperty = isOneOf([
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
  AST.TSPropertySignature,
]);

export const isPropertyOrMethod = isOneOf([
  AST.PropertyDefinition,
  AST.MethodDefinition,
]);

// JSX guards
export const isJSXElement = is(AST.JSXElement);
export const isJSXFragment = is(AST.JSXFragment);
export const isJSXElementOrFragment = isOneOf([AST.JSXElement, AST.JSXFragment]);
export const isJSXTagNameExpression = isOneOf([
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
]);

export const isJSX = isOneOf([
  AST.JSXAttribute,
  AST.JSXClosingElement,
  AST.JSXClosingFragment,
  AST.JSXElement,
  AST.JSXEmptyExpression,
  AST.JSXExpressionContainer,
  AST.JSXFragment,
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
  AST.JSXOpeningElement,
  AST.JSXOpeningFragment,
  AST.JSXSpreadAttribute,
  AST.JSXSpreadChild,
  AST.JSXText,
]);

// TypeScript type guards
export const isTypeExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
]);

export const isTypeAssertionExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
]);

export const isExpression = isOneOf([
  AST.ArrayExpression,
  AST.ArrayPattern,
  AST.ArrowFunctionExpression,
  AST.AssignmentExpression,
  AST.AwaitExpression,
  AST.BinaryExpression,
  AST.CallExpression,
  AST.ChainExpression,
  AST.ClassExpression,
  AST.ConditionalExpression,
  AST.FunctionExpression,
  AST.Identifier,
  AST.ImportExpression,
  AST.JSXElement,
  AST.JSXFragment,
  AST.Literal,
  AST.LogicalExpression,
  AST.MemberExpression,
  AST.MetaProperty,
  AST.NewExpression,
  AST.ObjectExpression,
  AST.ObjectPattern,
  AST.SequenceExpression,
  AST.Super,
  AST.TSAsExpression,
  AST.TSInstantiationExpression,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
  AST.TSTypeAssertion,
  AST.TaggedTemplateExpression,
  AST.TemplateLiteral,
  AST.ThisExpression,
  AST.UnaryExpression,
  AST.UpdateExpression,
  AST.YieldExpression,
]);
