/* eslint-disable @typescript-eslint/no-unused-vars */
import { or } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.FunctionExpression,
]);

export const isFunctionType = isOneOf([
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.TSCallSignatureDeclaration,
  AST_NODE_TYPES.TSConstructSignatureDeclaration,
  AST_NODE_TYPES.TSDeclareFunction,
  AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
  AST_NODE_TYPES.TSFunctionType,
  AST_NODE_TYPES.TSMethodSignature,
]);

export const isClass = isOneOf([AST_NODE_TYPES.ClassDeclaration, AST_NODE_TYPES.ClassExpression]);

export const isLoop = isOneOf([
  AST_NODE_TYPES.DoWhileStatement,
  AST_NODE_TYPES.ForInStatement,
  AST_NODE_TYPES.ForOfStatement,
  AST_NODE_TYPES.ForStatement,
  AST_NODE_TYPES.WhileStatement,
]);

export const isControlFlow = or(
  isLoop,
  isOneOf([
    AST_NODE_TYPES.IfStatement,
    AST_NODE_TYPES.SwitchStatement,
  ]),
);

export const isConditional = or(
  isControlFlow,
  isOneOf([
    AST_NODE_TYPES.LogicalExpression,
    AST_NODE_TYPES.ConditionalExpression,
  ]),
);

export const isArrayTupleType = isOneOf([AST_NODE_TYPES.TSArrayType, AST_NODE_TYPES.TSTupleType]);

export const isProperty = isOneOf([
  AST_NODE_TYPES.PropertyDefinition,
  AST_NODE_TYPES.TSIndexSignature,
  AST_NODE_TYPES.TSParameterProperty,
  AST_NODE_TYPES.TSPropertySignature,
]);

export const isJSXElement = is(AST_NODE_TYPES.JSXElement);

export const isJSXFragment = is(AST_NODE_TYPES.JSXFragment);

export const isJSX = isOneOf([
  AST_NODE_TYPES.JSXAttribute,
  AST_NODE_TYPES.JSXSpreadChild,
  AST_NODE_TYPES.JSXClosingElement,
  AST_NODE_TYPES.JSXClosingFragment,
  AST_NODE_TYPES.JSXElement,
  AST_NODE_TYPES.JSXEmptyExpression,
  AST_NODE_TYPES.JSXExpressionContainer,
  AST_NODE_TYPES.JSXFragment,
  AST_NODE_TYPES.JSXIdentifier,
  AST_NODE_TYPES.JSXMemberExpression,
  AST_NODE_TYPES.JSXNamespacedName,
  AST_NODE_TYPES.JSXOpeningElement,
  AST_NODE_TYPES.JSXOpeningFragment,
  AST_NODE_TYPES.JSXSpreadAttribute,
  AST_NODE_TYPES.JSXSpreadChild,
  AST_NODE_TYPES.JSXText,
]);

export const isJSXTagNameExpression = isOneOf([
  AST_NODE_TYPES.JSXIdentifier,
  AST_NODE_TYPES.JSXMemberExpression,
  AST_NODE_TYPES.JSXNamespacedName,
]);

export const isDestructuringPattern = isOneOf([
  AST_NODE_TYPES.ArrayPattern,
  AST_NODE_TYPES.AssignmentPattern,
  AST_NODE_TYPES.ObjectPattern,
  AST_NODE_TYPES.RestElement,
]);

export const isTypeDeclaration = isOneOf([
  AST_NODE_TYPES.TSInterfaceDeclaration,
  AST_NODE_TYPES.TSTypeAliasDeclaration,
]);

export const isLeftHandSideExpression = isOneOf([
  AST_NODE_TYPES.ArrayExpression,
  AST_NODE_TYPES.ArrayPattern,
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.CallExpression,
  AST_NODE_TYPES.ClassExpression,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.Identifier,
  AST_NODE_TYPES.JSXElement,
  AST_NODE_TYPES.JSXFragment,
  AST_NODE_TYPES.Literal,
  AST_NODE_TYPES.TemplateLiteral,
  AST_NODE_TYPES.MemberExpression,
  AST_NODE_TYPES.MetaProperty,
  AST_NODE_TYPES.ObjectExpression,
  AST_NODE_TYPES.ObjectPattern,
  AST_NODE_TYPES.SequenceExpression,
  AST_NODE_TYPES.Super,
  AST_NODE_TYPES.TaggedTemplateExpression,
  AST_NODE_TYPES.ThisExpression,
]);

export const isLeftHandSideExpressionType = isOneOf([
  AST_NODE_TYPES.ArrayExpression,
  AST_NODE_TYPES.ArrayPattern,
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.CallExpression,
  AST_NODE_TYPES.ClassExpression,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.Identifier,
  AST_NODE_TYPES.JSXElement,
  AST_NODE_TYPES.JSXFragment,
  AST_NODE_TYPES.Literal,
  AST_NODE_TYPES.TemplateLiteral,
  AST_NODE_TYPES.MemberExpression,
  AST_NODE_TYPES.MetaProperty,
  AST_NODE_TYPES.ObjectExpression,
  AST_NODE_TYPES.ObjectPattern,
  AST_NODE_TYPES.SequenceExpression,
  AST_NODE_TYPES.Super,
  AST_NODE_TYPES.TaggedTemplateExpression,
  AST_NODE_TYPES.ThisExpression,
  AST_NODE_TYPES.TSAsExpression,
  AST_NODE_TYPES.TSNonNullExpression,
  AST_NODE_TYPES.TSTypeAssertion,
]);
