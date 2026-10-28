import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";
import type { TSESTreeDirective } from "./tree";

// Node-type lists passed to `isOneOf` are ordered by observed occurrence
// frequency (most frequent first), so `Array.prototype.includes` short-circuits
// on the common cases. Keep this order when adding new node types.

// Base guards

/** Check if a node is of the given type. */
export const is = ASTUtils.isNodeOfType;

/** Check if a node is one of the given types. */
export const isOneOf = ASTUtils.isNodeOfTypes;

// Identifier guards

/**
 * Check if a node is an identifier, optionally matching a specific name.
 * @param node The node to check.
 * @param name The identifier name to match. When omitted, any identifier matches.
 * @returns `true` if the node is a matching identifier.
 */
export function isIdentifier(node: TSESTree.Node, name?: string): node is TSESTree.Identifier {
  return node.type === AST.Identifier && (name == null || node.name === name);
}

// Directive guards

/**
 * Check if a node is a directive (an expression statement in a directive prologue,
 * ex: `"use client"`), optionally matching a specific name.
 * @param node The node to check.
 * @param name The directive name to match. When omitted, any directive matches.
 * @returns `true` if the node is a directive and, when `name` is given, has that name.
 */
export function isDirective(node: TSESTree.Node, name?: string): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && node.directive != null && (name == null || node.directive === name);
}

// Expression guards

/** Check if a node is a call expression. */
export const isCallExpression = is(AST.CallExpression);

/** Check if a node is an expression node. */
export const isExpression = isOneOf([
  AST.Identifier,
  AST.Literal,
  AST.CallExpression,
  AST.MemberExpression,
  AST.ObjectExpression,
  AST.TemplateLiteral,
  AST.ArrayExpression,
  AST.TaggedTemplateExpression,
  AST.BinaryExpression,
  AST.ArrowFunctionExpression,
  AST.LogicalExpression,
  AST.UnaryExpression,
  AST.AssignmentExpression,
  AST.FunctionExpression,
  AST.ChainExpression,
  AST.TSNonNullExpression,
  AST.NewExpression,
  AST.ObjectPattern,
  AST.TSAsExpression,
  AST.ConditionalExpression,
  AST.ThisExpression,
  AST.YieldExpression,
  AST.TSSatisfiesExpression,
  AST.JSXElement,
  AST.ArrayPattern,
  AST.UpdateExpression,
  AST.AwaitExpression,
  AST.MetaProperty,
  AST.ImportExpression,
  AST.ClassExpression,
  AST.JSXFragment,
  AST.SequenceExpression,
  AST.Super,
  AST.TSInstantiationExpression,
  AST.TSTypeAssertion,
]);

/** Check if a node is a member expression. */
export const isMemberExpression = is(AST.MemberExpression);

/** Check if a node is an object expression. */
export const isObjectExpression = is(AST.ObjectExpression);

// Statement guards

/** Check if a node is a loop statement. */
export const isLoopStatement = isOneOf([
  AST.ForOfStatement,
  AST.WhileStatement,
  AST.ForStatement,
  AST.ForInStatement,
  AST.DoWhileStatement,
]);

/** Check if a node is a return statement. */
export const isReturnStatement = is(AST.ReturnStatement);

// Composite guards

/** Check if a node is a class declaration or class expression. */
export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

/** Check if a node is a conditional or logical expression, or a control flow statement. */
export const isConditional = isOneOf([
  AST.IfStatement,
  AST.LogicalExpression,
  AST.ConditionalExpression,
  AST.ForOfStatement,
  AST.SwitchStatement,
  AST.WhileStatement,
  AST.ForStatement,
  AST.ForInStatement,
  AST.DoWhileStatement,
]);

/** Check if a node is a function declaration, function expression, or arrow function expression. */
export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

/** Check if a node is a function declaration, function expression, arrow function expression, class declaration, or class expression. */
export const isFunctionOrClass = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
  AST.ClassDeclaration,
  AST.ClassExpression,
]);

/**
 * Check if a node is a `TSPropertySignature`, `PropertyDefinition`, `TSIndexSignature`, or `TSParameterProperty`.
 *
 * Abstract and accessor property definitions (`TSAbstractPropertyDefinition`, `AccessorProperty`,
 * `TSAbstractAccessorProperty`) are not included.
 */
export const isProperty = isOneOf([
  AST.TSPropertySignature,
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
]);

/**
 * Check if a node is a `MethodDefinition` or `PropertyDefinition`.
 *
 * Abstract and accessor member definitions (`TSAbstractMethodDefinition`, `TSAbstractPropertyDefinition`,
 * `AccessorProperty`, `TSAbstractAccessorProperty`) are not included.
 */
export const isPropertyOrMethod = isOneOf([
  AST.MethodDefinition,
  AST.PropertyDefinition,
]);

// Pattern guards

/**
 * Check if a node is the default value of an array pattern element, i.e. an
 * `AssignmentPattern` directly nested in an `ArrayPattern` (ex: `const [a = 1] = arr`).
 * @param node The node to check.
 * @returns `true` if the node is an array pattern element default.
 */
export function isArrayPatternElementDefault(node: TSESTree.Node): node is TSESTree.AssignmentPattern {
  return node.type === AST.AssignmentPattern && node.parent.type === AST.ArrayPattern;
}

/**
 * Check if a node is the default value of an object pattern property, i.e. an
 * `AssignmentPattern` used as the `value` of a `Property` inside an `ObjectPattern`
 * (ex: `const { a = 1 } = obj`).
 * @param node The node to check.
 * @returns `true` if the node is an object pattern element default.
 */
export function isObjectPatternElementDefault(node: TSESTree.Node): node is TSESTree.AssignmentPattern {
  return node.type === AST.AssignmentPattern
    && node.parent.type === AST.Property
    && node.parent.value === node
    && node.parent.parent.type === AST.ObjectPattern;
}

// JSX guards

/** Check if a node is any JSX-related node. */
export const isJSX = isOneOf([
  AST.JSXIdentifier,
  AST.JSXText,
  AST.JSXAttribute,
  AST.JSXElement,
  AST.JSXOpeningElement,
  AST.JSXClosingElement,
  AST.JSXExpressionContainer,
  AST.JSXMemberExpression,
  AST.JSXSpreadAttribute,
  AST.JSXClosingFragment,
  AST.JSXEmptyExpression,
  AST.JSXFragment,
  AST.JSXNamespacedName,
  AST.JSXOpeningFragment,
  AST.JSXSpreadChild,
]);

/** Check if a node is a JSX element. */
export const isJSXElement = is(AST.JSXElement);

/** Check if a node is a JSX element or JSX fragment. */
export const isJSXElementOrFragment = isOneOf([AST.JSXElement, AST.JSXFragment]);

/** Check if a node is a JSX expression container. */
export const isJSXExpressionContainer = is(AST.JSXExpressionContainer);

/** Check if a node is a JSX fragment. */
export const isJSXFragment = is(AST.JSXFragment);

/** Check if a node is a JSX spread attribute. */
export const isJSXSpreadAttribute = is(AST.JSXSpreadAttribute);

/** Check if a node can appear as a JSX tag name. */
export const isJSXTagNameExpression = isOneOf([
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
]);

// TypeScript guards

/** Check if a node is a TypeScript type assertion-like expression (as, assertion, non-null, or satisfies). */
export const isTypeAssertionExpression = isOneOf([
  AST.TSNonNullExpression,
  AST.TSAsExpression,
  AST.TSSatisfiesExpression,
  AST.TSTypeAssertion,
]);

/** Check if a node is a TypeScript type expression (assertion, non-null, satisfies, or instantiation). */
export const isTypeExpression = isOneOf([
  AST.TSNonNullExpression,
  AST.TSAsExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
  AST.TSTypeAssertion,
]);

/** Check if a node is a TypeScript type expression or a chain expression (i.e. a transparent wrapper around an inner expression). */
export const isTypeOrChainExpression = isOneOf([
  AST.ChainExpression,
  AST.TSNonNullExpression,
  AST.TSAsExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
  AST.TSTypeAssertion,
]);
