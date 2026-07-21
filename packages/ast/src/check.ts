import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";
import type { TSESTreeDirective } from "./types";

// Base guards

/** Check if a node is of the given type. */
export const is = ASTUtils.isNodeOfType;

/** Check if a node is one of the given types. */
export const isOneOf = ASTUtils.isNodeOfTypes;

// Directive check

/**
 * Check if a node is a directive statement (ex: `"use client"`), optionally matching a specific directive name.
 * @param node The node to check.
 * @param name The directive name to match. When omitted, any directive matches.
 * @returns `true` if the node is a matching directive statement.
 */
export function isDirective(node: TSESTree.Node, name?: string): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && (name == null || node.directive === name);
}

// Identifier check

/**
 * Check if a node is an identifier, optionally matching a specific name.
 * @param node The node to check.
 * @param name The identifier name to match. When omitted, any identifier matches.
 * @returns `true` if the node is a matching identifier.
 */
export function isIdentifier(node: TSESTree.Node, name?: string): node is TSESTree.Identifier {
  return node.type === AST.Identifier && (name == null || node.name === name);
}

// Composite type guards

/** Check if a node is a class declaration or class expression. */
export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

/** Check if a node is a function declaration, function expression, or arrow function expression. */
export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

/** Check if a node is a property-like node (property definition, index signature, parameter property, or property signature). */
export const isProperty = isOneOf([
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
  AST.TSPropertySignature,
]);

/** Check if a node is a property or method definition. */
export const isPropertyOrMethod = isOneOf([
  AST.PropertyDefinition,
  AST.MethodDefinition,
]);

// JSX guards

/** Check if a node is a JSX element. */
export const isJSXElement = is(AST.JSXElement);

/** Check if a node is a JSX fragment. */
export const isJSXFragment = is(AST.JSXFragment);

/** Check if a node is a JSX element or JSX fragment. */
export const isJSXElementOrFragment = isOneOf([AST.JSXElement, AST.JSXFragment]);

/** Check if a node can appear as a JSX tag name. */
export const isJSXTagNameExpression = isOneOf([
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
]);

/** Check if a node is any JSX-related node. */
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

/** Check if a node is a TypeScript type expression (assertion, non-null, satisfies, or instantiation). */
export const isTypeExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
]);

/** Check if a node is a TypeScript type assertion-like expression (as, assertion, non-null, or satisfies). */
export const isTypeAssertionExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
]);

/** Check if a node is an expression node. */
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

/**
 * Check if a node is a conditional expression or a control flow statement.
 * @param node The node to check.
 * @returns `true` if the node is conditional.
 */
export const isConditional = isOneOf([
  AST.DoWhileStatement,
  AST.ForInStatement,
  AST.ForOfStatement,
  AST.ForStatement,
  AST.WhileStatement,
  AST.IfStatement,
  AST.SwitchStatement,
  AST.LogicalExpression,
  AST.ConditionalExpression,
]);
