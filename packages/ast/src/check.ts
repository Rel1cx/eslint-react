import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";
import type { TSESTreeDirective } from "./types";

type LiteralType = "boolean" | "null" | "number" | "regexp" | "string";

// Base guards
export const is = ASTUtils.isNodeOfType;
export const isOneOf = ASTUtils.isNodeOfTypes;

// Literal check (curried)
export function isLiteral(): (node: TSESTree.Node) => node is TSESTree.Literal;
export function isLiteral(kind: "boolean"): (node: TSESTree.Node) => node is TSESTree.BooleanLiteral;
export function isLiteral(kind: "null"): (node: TSESTree.Node) => node is TSESTree.NullLiteral;
export function isLiteral(kind: "number"): (node: TSESTree.Node) => node is TSESTree.NumberLiteral;
export function isLiteral(kind: "regexp"): (node: TSESTree.Node) => node is TSESTree.RegExpLiteral;
export function isLiteral(kind: "string"): (node: TSESTree.Node) => node is TSESTree.StringLiteral;
export function isLiteral(kind?: LiteralType): (node: TSESTree.Node) => boolean {
  return (node) => {
    if (node.type !== AST.Literal) return false;
    if (kind == null) return true;
    switch (kind) {
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
  };
}

// Directive check
export function isDirective(name: string) {
  return (node: TSESTree.Node): node is TSESTreeDirective =>
    node.type === AST.ExpressionStatement && node.directive === name;
}

// Identifier check
export function isIdentifier(name: string) {
  return (node: TSESTree.Node): node is TSESTree.Identifier => node.type === AST.Identifier && node.name === name;
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
