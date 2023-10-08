import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as N } from "@typescript-eslint/utils";

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

export type TSESTreeTypeDeclaration =
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeAliasDeclaration;

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
    N.ArrowFunctionExpression,
    N.FunctionDeclaration,
    N.FunctionExpression,
]);

export const isFunctionType = isOneOf([
    N.ArrowFunctionExpression,
    N.FunctionDeclaration,
    N.FunctionExpression,
    N.TSCallSignatureDeclaration,
    N.TSConstructSignatureDeclaration,
    N.TSDeclareFunction,
    N.TSEmptyBodyFunctionExpression,
    N.TSFunctionType,
    N.TSMethodSignature,
]);

export const isClass = isOneOf([N.ClassDeclaration, N.ClassExpression]);

export const isLoop = isOneOf([
    N.DoWhileStatement,
    N.ForInStatement,
    N.ForOfStatement,
    N.ForStatement,
    N.WhileStatement,
]);

export const isArrayTupleType = isOneOf([N.TSArrayType, N.TSTupleType]);

export const isProperty = isOneOf([
    N.PropertyDefinition,
    N.TSIndexSignature,
    N.TSParameterProperty,
    N.TSPropertySignature,
]);

export const isJSXElement = is(N.JSXElement);

export const isJSXFragment = is(N.JSXFragment);

export const isJSX = isOneOf([
    N.JSXAttribute,
    N.JSXSpreadChild,
    N.JSXClosingElement,
    N.JSXClosingFragment,
    N.JSXElement,
    N.JSXEmptyExpression,
    N.JSXExpressionContainer,
    N.JSXFragment,
    N.JSXIdentifier,
    N.JSXMemberExpression,
    N.JSXNamespacedName,
    N.JSXOpeningElement,
    N.JSXOpeningFragment,
    N.JSXSpreadAttribute,
    N.JSXSpreadChild,
    N.JSXText,
]);

export const isTypeDeclaration = isOneOf([
    N.TSInterfaceDeclaration,
    N.TSTypeAliasDeclaration,
]);
