/* eslint-disable @typescript-eslint/no-unused-vars */
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";

import { NodeType } from "./types";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
  NodeType.ArrowFunctionExpression,
  NodeType.FunctionDeclaration,
  NodeType.FunctionExpression,
]);

export const isFunctionType = isOneOf([
  NodeType.ArrowFunctionExpression,
  NodeType.FunctionDeclaration,
  NodeType.FunctionExpression,
  NodeType.TSCallSignatureDeclaration,
  NodeType.TSConstructSignatureDeclaration,
  NodeType.TSDeclareFunction,
  NodeType.TSEmptyBodyFunctionExpression,
  NodeType.TSFunctionType,
  NodeType.TSMethodSignature,
]);

export const isClass = isOneOf([NodeType.ClassDeclaration, NodeType.ClassExpression]);

export const isLoop = isOneOf([
  NodeType.DoWhileStatement,
  NodeType.ForInStatement,
  NodeType.ForOfStatement,
  NodeType.ForStatement,
  NodeType.WhileStatement,
]);

export const isArrayTupleType = isOneOf([NodeType.TSArrayType, NodeType.TSTupleType]);

export const isProperty = isOneOf([
  NodeType.PropertyDefinition,
  NodeType.TSIndexSignature,
  NodeType.TSParameterProperty,
  NodeType.TSPropertySignature,
]);

export const isJSXElement = is(NodeType.JSXElement);

export const isJSXFragment = is(NodeType.JSXFragment);

export const isJSX = isOneOf([
  NodeType.JSXAttribute,
  NodeType.JSXSpreadChild,
  NodeType.JSXClosingElement,
  NodeType.JSXClosingFragment,
  NodeType.JSXElement,
  NodeType.JSXEmptyExpression,
  NodeType.JSXExpressionContainer,
  NodeType.JSXFragment,
  NodeType.JSXIdentifier,
  NodeType.JSXMemberExpression,
  NodeType.JSXNamespacedName,
  NodeType.JSXOpeningElement,
  NodeType.JSXOpeningFragment,
  NodeType.JSXSpreadAttribute,
  NodeType.JSXSpreadChild,
  NodeType.JSXText,
]);

export const isJSXTagNameExpression = isOneOf([
  NodeType.JSXIdentifier,
  NodeType.JSXMemberExpression,
  NodeType.JSXNamespacedName,
]);

export const isDestructuringPattern = isOneOf([
  NodeType.ArrayPattern,
  NodeType.AssignmentPattern,
  NodeType.ObjectPattern,
  NodeType.RestElement,
]);

export const isTypeDeclaration = isOneOf([
  NodeType.TSInterfaceDeclaration,
  NodeType.TSTypeAliasDeclaration,
]);

export const isLeftHandSideExpression = isOneOf([
  NodeType.ArrayExpression,
  NodeType.ArrayPattern,
  NodeType.ArrowFunctionExpression,
  NodeType.CallExpression,
  NodeType.ClassExpression,
  NodeType.FunctionExpression,
  NodeType.Identifier,
  NodeType.JSXElement,
  NodeType.JSXFragment,
  NodeType.Literal,
  NodeType.TemplateLiteral,
  NodeType.MemberExpression,
  NodeType.MetaProperty,
  NodeType.ObjectExpression,
  NodeType.ObjectPattern,
  NodeType.SequenceExpression,
  NodeType.Super,
  NodeType.TaggedTemplateExpression,
  NodeType.ThisExpression,
]);

export const isLeftHandSideExpressionType = isOneOf([
  NodeType.ArrayExpression,
  NodeType.ArrayPattern,
  NodeType.ArrowFunctionExpression,
  NodeType.CallExpression,
  NodeType.ClassExpression,
  NodeType.FunctionExpression,
  NodeType.Identifier,
  NodeType.JSXElement,
  NodeType.JSXFragment,
  NodeType.Literal,
  NodeType.TemplateLiteral,
  NodeType.MemberExpression,
  NodeType.MetaProperty,
  NodeType.ObjectExpression,
  NodeType.ObjectPattern,
  NodeType.SequenceExpression,
  NodeType.Super,
  NodeType.TaggedTemplateExpression,
  NodeType.ThisExpression,
  NodeType.TSAsExpression,
  NodeType.TSNonNullExpression,
  NodeType.TSTypeAssertion,
]);
