import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";
import type { TSESTreeDirective } from "./types";

type LiteralType = "boolean" | "null" | "number" | "regexp" | "string";

// Base guards
export const is = ASTUtils.isNodeOfType;
export const isOneOf = ASTUtils.isNodeOfTypes;

// Identifier check
export function identifier(
  node: TSESTree.Node | null,
  named?: string,
): node is TSESTree.Identifier {
  return node?.type === AST.Identifier && (named == null || node.name === named);
}

// Literal check (overloaded)
export function literal(node: TSESTree.Node): node is TSESTree.Literal;
export function literal(node: TSESTree.Node, ofKind: "boolean"): node is TSESTree.BooleanLiteral;
export function literal(node: TSESTree.Node, ofKind: "null"): node is TSESTree.NullLiteral;
export function literal(node: TSESTree.Node, ofKind: "number"): node is TSESTree.NumberLiteral;
export function literal(node: TSESTree.Node, ofKind: "regexp"): node is TSESTree.RegExpLiteral;
export function literal(node: TSESTree.Node, ofKind: "string"): node is TSESTree.StringLiteral;
export function literal(node: TSESTree.Node, ofKind?: LiteralType): boolean {
  if (node.type !== AST.Literal) return false;
  if (ofKind == null) return true;
  switch (ofKind) {
    case "boolean":
      return typeof node.value === "boolean";
    case "null":
      // tsl-ignore dx/nullish
      return node.value === null;
    case "number":
      return typeof node.value === "number";
    case "regexp":
      return "regex" in node;
    case "string":
      return typeof node.value === "string";
    default:
      return false;
  }
}

// Expression check
export function thisExpression(expression: TSESTree.Expression): boolean {
  return expression.type === AST.ThisExpression;
}

// Composite type guards
export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

export const isMethodOrProperty = isOneOf([
  AST.PropertyDefinition,
  AST.MethodDefinition,
]);

export const isProperty = isOneOf([
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
  AST.TSPropertySignature,
]);

// JSX guards
export const isJSXElement = is(AST.JSXElement);
export const isJSXFragment = is(AST.JSXFragment);
export const isJSXLike = isOneOf([AST.JSXElement, AST.JSXFragment]);
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

// Directive check
export function directive(node: TSESTree.Node): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && node.directive != null;
}
