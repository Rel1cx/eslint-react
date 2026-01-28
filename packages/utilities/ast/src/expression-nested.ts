import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { is, isFunction } from "./is";
import { findParentNode } from "./traverse";

/**
 * Get all nested identifiers in a expression like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  if (node.type === T.Identifier) {
    identifiers.push(node);
  }
  if ("arguments" in node) {
    const chunk = node.arguments.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  if ("elements" in node) {
    const chunk = node.elements
      .filter((x) => x != null)
      .flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  if ("properties" in node) {
    const chunk = node.properties.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  if ("expressions" in node) {
    const chunk = node.expressions.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  if ("left" in node) {
    const chunk = getNestedIdentifiers(node.left);
    identifiers.push(...chunk);
  }
  if ("right" in node) {
    const chunk = getNestedIdentifiers(node.right);
    identifiers.push(...chunk);
  }
  if (node.type === T.Property) {
    const chunk = getNestedIdentifiers(node.value);
    identifiers.push(...chunk);
  }
  if (node.type === T.SpreadElement) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === T.MemberExpression) {
    const chunk = getNestedIdentifiers(node.object);
    identifiers.push(...chunk);
  }
  if (node.type === T.UnaryExpression) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === T.ChainExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === T.TSNonNullExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === T.TSAsExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === T.TSSatisfiesExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  return identifiers;
}

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  const boundaryNode = isFunction(node)
    ? node
    : findParentNode(node, isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== T.ReturnStatement) {
        return;
      }
      const parentFunction = findParentNode(node, isFunction);
      if (parentFunction !== boundaryNode) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}

/**
 * Get all nested expressions of type T in an expression like node
 * @param type The type of the expression to retrieve within the node
 * @returns A partially applied function bound to a predicate of type T. The returned function can be called passing a
 * node, and it will return an array of all nested expressions of type T.
 */
// dprint-ignore
export function getNestedExpressionsOfType<TNodeType extends T>(type: TNodeType): (node: TSESTree.Node) => Extract<TSESTree.Node, { type: TNodeType }>[] {
  const isNodeOfType = is(type);
  return (node) => {
    const boundGetNestedExpressionsOfType = getNestedExpressionsOfType(type);
    const expressions: Extract<TSESTree.Node, { type: TNodeType }>[] = [];
    if (isNodeOfType(node)) {
      expressions.push(node);
    }
    if ("arguments" in node) {
      const chunk = node.arguments.flatMap(getNestedExpressionsOfType(type));
      expressions.push(...chunk);
    }
    if (
      "expression" in node
      && node.expression !== true
      && node.expression !== false
    ) {
      const chunk = boundGetNestedExpressionsOfType(node.expression);
      expressions.push(...chunk);
    }
    if ("left" in node) {
      const chunk = boundGetNestedExpressionsOfType(node.left);
      expressions.push(...chunk);
    }
    if ("right" in node) {
      const chunk = boundGetNestedExpressionsOfType(node.right);
      expressions.push(...chunk);
    }
    if ("test" in node && node.test != null) {
      const chunk = boundGetNestedExpressionsOfType(node.test);
      expressions.push(...chunk);
    }
    if ("consequent" in node) {
      const chunk = Array.isArray(node.consequent)
        ? node.consequent.flatMap(boundGetNestedExpressionsOfType)
        : boundGetNestedExpressionsOfType(node.consequent);
      expressions.push(...chunk);
    }
    if ("alternate" in node && node.alternate != null) {
      const chunk = Array.isArray(node.alternate)
        ? node.alternate.flatMap(boundGetNestedExpressionsOfType)
        : boundGetNestedExpressionsOfType(node.alternate);
      expressions.push(...chunk);
    }
    if ("elements" in node) {
      const chunk = node.elements
        .filter((x) => x != null)
        .flatMap(getNestedExpressionsOfType(type));
      expressions.push(...chunk);
    }
    if ("properties" in node) {
      const chunk = node.properties.flatMap(boundGetNestedExpressionsOfType);
      expressions.push(...chunk);
    }
    if ("expressions" in node) {
      const chunk = node.expressions.flatMap(boundGetNestedExpressionsOfType);
      expressions.push(...chunk);
    }
    if (node.type === T.Property) {
      const chunk = boundGetNestedExpressionsOfType(node.value);
      expressions.push(...chunk);
    }
    if (node.type === T.SpreadElement) {
      const chunk = boundGetNestedExpressionsOfType(node.argument);
      expressions.push(...chunk);
    }
    if (node.type === T.MemberExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.object);
      expressions.push(...chunk);
    }
    if (node.type === T.UnaryExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.argument);
      expressions.push(...chunk);
    }
    if (node.type === T.ChainExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.expression);
      expressions.push(...chunk);
    }
    if (node.type === T.TSNonNullExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.expression);
      expressions.push(...chunk);
    }
    if (node.type === T.TSAsExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.expression);
      expressions.push(...chunk);
    }
    if (node.type === T.TSSatisfiesExpression) {
      const chunk = boundGetNestedExpressionsOfType(node.expression);
      expressions.push(...chunk);
    }
    return expressions;
  };
}

/**
 * Get all nested new expressions in an expression like node
 * @param node The node to get the nested new expressions from
 * @returns All nested new expressions
 */
export const getNestedNewExpressions = getNestedExpressionsOfType(
  T.NewExpression,
);

/**
 * Get all nested call expressions in a expression like node
 * @param node The node to get the nested call expressions from
 * @returns All nested call expressions
 */
export const getNestedCallExpressions = getNestedExpressionsOfType(
  T.CallExpression,
);
