import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/typescript-estree";
import { ASTUtils } from "@typescript-eslint/utils";

/**
 * Get all nested expressions of type T in an expression like node
 * @param type The type of the expression to retrieve within the node
 * @returns A partially applied function bound to a predicate of type T. The returned function can be called passing a
 * node, and it will return an array of all nested expressions of type T.
 */
export function getNestedExpressionsOfType<TNodeType extends T>(
  type: TNodeType,
): (node: TSESTree.Node) => Extract<TSESTree.Node, { type: TNodeType }>[] {
  const isNodeOfType = ASTUtils.isNodeOfType(type);
  return function(node) {
    const boundGetNestedExpressionsOfType = getNestedExpressionsOfType(type);
    const expressions: Extract<TSESTree.Node, { type: TNodeType }>[] = [];
    if (isNodeOfType(node)) {
      expressions.push(node);
    }
    if ("arguments" in node) {
      const chunk = node.arguments.map(getNestedExpressionsOfType(type)).flat(1);
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
        ? node.consequent.map(boundGetNestedExpressionsOfType).flat(1)
        : boundGetNestedExpressionsOfType(node.consequent);
      expressions.push(...chunk);
    }
    if ("alternate" in node && node.alternate != null) {
      const chunk = Array.isArray(node.alternate)
        ? node.alternate.map(boundGetNestedExpressionsOfType).flat(1)
        : boundGetNestedExpressionsOfType(node.alternate);
      expressions.push(...chunk);
    }
    if ("elements" in node) {
      const chunk = node.elements.filter((x) => x != null).map(getNestedExpressionsOfType(type)).flat(1);
      expressions.push(...chunk);
    }
    if ("properties" in node) {
      const chunk = node.properties.map(boundGetNestedExpressionsOfType).flat(1);
      expressions.push(...chunk);
    }
    if ("expressions" in node) {
      const chunk = node.expressions.map(boundGetNestedExpressionsOfType).flat(1);
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
