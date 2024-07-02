import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function getNestedCallExpressions(node: TSESTree.Node): TSESTree.CallExpression[] {
  const callExpressions: TSESTree.CallExpression[] = [];

  if (node.type === NodeType.CallExpression) {
    callExpressions.push(node);
  }

  if ("arguments" in node) {
    node.arguments.forEach((x) => {
      callExpressions.push(...getNestedCallExpressions(x));
    });
  }

  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    callExpressions.push(...getNestedCallExpressions(node.expression));
  }

  if ("left" in node) {
    callExpressions.push(...getNestedCallExpressions(node.left));
  }

  if ("right" in node) {
    callExpressions.push(...getNestedCallExpressions(node.right));
  }

  if ("test" in node && node.test !== null) {
    callExpressions.push(...getNestedCallExpressions(node.test));
  }

  if ("consequent" in node) {
    Array.isArray(node.consequent)
      ? node.consequent.forEach((x) => {
        callExpressions.push(...getNestedCallExpressions(x));
      })
      : callExpressions.push(...getNestedCallExpressions(node.consequent));
  }

  if ("alternate" in node && node.alternate !== null) {
    Array.isArray(node.alternate)
      ? node.alternate.forEach((x: TSESTree.Node) => {
        callExpressions.push(...getNestedCallExpressions(x));
      })
      : callExpressions.push(
        ...getNestedCallExpressions(node.alternate),
      );
  }

  if ("elements" in node) {
    node.elements.forEach((x) => {
      if (x !== null) {
        callExpressions.push(...getNestedCallExpressions(x));
      }
    });
  }

  if ("properties" in node) {
    node.properties.forEach((x) => {
      callExpressions.push(...getNestedCallExpressions(x));
    });
  }

  if ("expressions" in node) {
    node.expressions.forEach((x) => {
      callExpressions.push(...getNestedCallExpressions(x));
    });
  }

  if (node.type === NodeType.Property) {
    callExpressions.push(...getNestedCallExpressions(node.value));
  }

  if (node.type === NodeType.SpreadElement) {
    callExpressions.push(...getNestedCallExpressions(node.argument));
  }

  if (node.type === NodeType.MemberExpression) {
    callExpressions.push(...getNestedCallExpressions(node.object));
  }

  if (node.type === NodeType.UnaryExpression) {
    callExpressions.push(...getNestedCallExpressions(node.argument));
  }

  if (node.type === NodeType.ChainExpression) {
    callExpressions.push(...getNestedCallExpressions(node.expression));
  }

  if (node.type === NodeType.TSNonNullExpression) {
    callExpressions.push(...getNestedCallExpressions(node.expression));
  }

  return callExpressions;
}
