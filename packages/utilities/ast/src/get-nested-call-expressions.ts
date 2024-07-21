import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function getNestedCallExpressions(node: TSESTree.Node): readonly TSESTree.CallExpression[] {
  const callExpressions: TSESTree.CallExpression[] = [];
  if (node.type === NodeType.CallExpression) {
    callExpressions.push(node);
  }
  if ("arguments" in node) {
    const chunk = node.arguments.map(getNestedCallExpressions).flat(1);
    callExpressions.push(...chunk);
  }
  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    const chunk = getNestedCallExpressions(node.expression);
    callExpressions.push(...chunk);
  }
  if ("left" in node) {
    const chunk = getNestedCallExpressions(node.left);
    callExpressions.push(...chunk);
  }
  if ("right" in node) {
    const chunk = getNestedCallExpressions(node.right);
    callExpressions.push(...chunk);
  }
  if ("test" in node && node.test !== null) {
    const chunk = getNestedCallExpressions(node.test);
    callExpressions.push(...chunk);
  }
  if ("consequent" in node) {
    const chunk = Array.isArray(node.consequent)
      ? node.consequent.map(getNestedCallExpressions).flat(1)
      : getNestedCallExpressions(node.consequent);
    callExpressions.push(...chunk);
  }
  if ("alternate" in node && node.alternate !== null) {
    const chunk = Array.isArray(node.alternate)
      ? node.alternate.map(getNestedCallExpressions).flat(1)
      : getNestedCallExpressions(node.alternate);
    callExpressions.push(...chunk);
  }
  if ("elements" in node) {
    const chunk = node.elements.filter((x) => x !== null).map(getNestedCallExpressions).flat(1);
    callExpressions.push(...chunk);
  }
  if ("properties" in node) {
    const chunk = node.properties.map(getNestedCallExpressions).flat(1);
    callExpressions.push(...chunk);
  }
  if ("expressions" in node) {
    const chunk = node.expressions.map(getNestedCallExpressions).flat(1);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.Property) {
    const chunk = getNestedCallExpressions(node.value);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.SpreadElement) {
    const chunk = getNestedCallExpressions(node.argument);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.MemberExpression) {
    const chunk = getNestedCallExpressions(node.object);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.UnaryExpression) {
    const chunk = getNestedCallExpressions(node.argument);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.ChainExpression) {
    const chunk = getNestedCallExpressions(node.expression);
    callExpressions.push(...chunk);
  }
  if (node.type === NodeType.TSNonNullExpression) {
    const chunk = getNestedCallExpressions(node.expression);
    callExpressions.push(...chunk);
  }
  return callExpressions;
}
