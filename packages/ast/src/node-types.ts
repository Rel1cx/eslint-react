import { AST_NODE_TYPES } from "@typescript-eslint/types";

export const NodeType = AST_NODE_TYPES;

import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";

export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

export type TSESTreeFunctionType =
  | TSESTree.TSCallSignatureDeclaration
  | TSESTree.TSConstructSignatureDeclaration
  | TSESTree.TSDeclareFunction
  | TSESTree.TSEmptyBodyFunctionExpression
  | TSESTree.TSFunctionType
  | TSESTree.TSMethodSignature
  | TSESTreeFunction;

export type TSESTreeClass = TSESTree.ClassDeclaration | TSESTree.ClassExpression;

export type TSESTreeLoop =
  | TSESTree.DoWhileStatement
  | TSESTree.ForInStatement
  | TSESTree.ForOfStatement
  | TSESTree.ForStatement
  | TSESTree.WhileStatement;

export type TSESTreeArrayTupleType = TSESTree.TSArrayType | TSESTree.TSTupleType;

export type TSESTreeProperty =
  | TSESTree.PropertyDefinition
  | TSESTree.TSIndexSignature
  | TSESTree.TSParameterProperty
  | TSESTree.TSPropertySignature;

export type TSESTreeJSX =
  | TSESTree.JSXAttribute
  | TSESTree.JSXChild
  | TSESTree.JSXClosingElement
  | TSESTree.JSXClosingFragment
  | TSESTree.JSXElement
  | TSESTree.JSXEmptyExpression
  | TSESTree.JSXExpression
  | TSESTree.JSXExpressionContainer
  | TSESTree.JSXFragment
  | TSESTree.JSXIdentifier
  | TSESTree.JSXIdentifierToken
  | TSESTree.JSXMemberExpression
  | TSESTree.JSXNamespacedName
  | TSESTree.JSXOpeningElement
  | TSESTree.JSXOpeningFragment
  | TSESTree.JSXSpreadAttribute
  | TSESTree.JSXSpreadChild
  | TSESTree.JSXTagNameExpression
  | TSESTree.JSXText
  | TSESTree.JSXTextToken;

export type TSESTreeDestructuringPattern =
  | TSESTree.ArrayPattern
  | TSESTree.AssignmentPattern
  | TSESTree.ObjectPattern
  | TSESTree.RestElement;

export type TSESTreeTypeDeclaration =
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration;

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
