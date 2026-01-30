import { or } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

export const isFunctionType = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
  AST.TSCallSignatureDeclaration,
  AST.TSConstructSignatureDeclaration,
  AST.TSDeclareFunction,
  AST.TSEmptyBodyFunctionExpression,
  AST.TSFunctionType,
  AST.TSMethodSignature,
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

export const isJSXElement = is(AST.JSXElement);

export const isJSXFragment = is(AST.JSXFragment);

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

export const isLoop = isOneOf([
  AST.DoWhileStatement,
  AST.ForInStatement,
  AST.ForOfStatement,
  AST.ForStatement,
  AST.WhileStatement,
]);

export const isControlFlow = or(
  isLoop,
  isOneOf([
    AST.IfStatement,
    AST.SwitchStatement,
  ]),
);

export const isConditional = or(
  isControlFlow,
  isOneOf([
    AST.LogicalExpression,
    AST.ConditionalExpression,
  ]),
);

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
