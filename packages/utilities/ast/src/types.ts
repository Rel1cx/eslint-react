import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

export const NodeType = AST_NODE_TYPES;

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
