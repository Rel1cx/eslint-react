/* eslint-disable @typescript-eslint/no-unused-vars */
import { or } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
  T.ArrowFunctionExpression,
  T.FunctionDeclaration,
  T.FunctionExpression,
]);

export const isFunctionType = isOneOf([
  T.ArrowFunctionExpression,
  T.FunctionDeclaration,
  T.FunctionExpression,
  T.TSCallSignatureDeclaration,
  T.TSConstructSignatureDeclaration,
  T.TSDeclareFunction,
  T.TSEmptyBodyFunctionExpression,
  T.TSFunctionType,
  T.TSMethodSignature,
]);

export const isClass = isOneOf([T.ClassDeclaration, T.ClassExpression]);

export const isLoop = isOneOf([
  T.DoWhileStatement,
  T.ForInStatement,
  T.ForOfStatement,
  T.ForStatement,
  T.WhileStatement,
]);

export const isControlFlow = or(
  isLoop,
  isOneOf([
    T.IfStatement,
    T.SwitchStatement,
  ]),
);

export const isConditional = or(
  isControlFlow,
  isOneOf([
    T.LogicalExpression,
    T.ConditionalExpression,
  ]),
);

export const isArrayTupleType = isOneOf([T.TSArrayType, T.TSTupleType]);

export const isProperty = isOneOf([
  T.PropertyDefinition,
  T.TSIndexSignature,
  T.TSParameterProperty,
  T.TSPropertySignature,
]);

export const isJSXElement = is(T.JSXElement);

export const isJSXFragment = is(T.JSXFragment);

export const isJSX = isOneOf([
  T.JSXAttribute,
  T.JSXSpreadChild,
  T.JSXClosingElement,
  T.JSXClosingFragment,
  T.JSXElement,
  T.JSXEmptyExpression,
  T.JSXExpressionContainer,
  T.JSXFragment,
  T.JSXIdentifier,
  T.JSXMemberExpression,
  T.JSXNamespacedName,
  T.JSXOpeningElement,
  T.JSXOpeningFragment,
  T.JSXSpreadAttribute,
  T.JSXSpreadChild,
  T.JSXText,
]);

export const isJSXTagNameExpression = isOneOf([
  T.JSXIdentifier,
  T.JSXMemberExpression,
  T.JSXNamespacedName,
]);

export const isDestructuringPattern = isOneOf([
  T.ArrayPattern,
  T.AssignmentPattern,
  T.ObjectPattern,
  T.RestElement,
]);

export const isTypeDeclaration = isOneOf([
  T.TSInterfaceDeclaration,
  T.TSTypeAliasDeclaration,
]);

export const isLeftHandSideExpression = isOneOf([
  T.ArrayExpression,
  T.ArrayPattern,
  T.ArrowFunctionExpression,
  T.CallExpression,
  T.ClassExpression,
  T.FunctionExpression,
  T.Identifier,
  T.JSXElement,
  T.JSXFragment,
  T.Literal,
  T.TemplateLiteral,
  T.MemberExpression,
  T.MetaProperty,
  T.ObjectExpression,
  T.ObjectPattern,
  T.SequenceExpression,
  T.Super,
  T.TaggedTemplateExpression,
  T.ThisExpression,
]);

export const isLeftHandSideExpressionType = isOneOf([
  T.ArrayExpression,
  T.ArrayPattern,
  T.ArrowFunctionExpression,
  T.CallExpression,
  T.ClassExpression,
  T.FunctionExpression,
  T.Identifier,
  T.JSXElement,
  T.JSXFragment,
  T.Literal,
  T.TemplateLiteral,
  T.MemberExpression,
  T.MetaProperty,
  T.ObjectExpression,
  T.ObjectPattern,
  T.SequenceExpression,
  T.Super,
  T.TaggedTemplateExpression,
  T.ThisExpression,
  T.TSAsExpression,
  T.TSNonNullExpression,
  T.TSTypeAssertion,
]);

export const isTypeExpression = isOneOf([
  T.TSAsExpression,
  T.TSTypeAssertion,
  T.TSNonNullExpression,
  T.TSSatisfiesExpression,
]);
