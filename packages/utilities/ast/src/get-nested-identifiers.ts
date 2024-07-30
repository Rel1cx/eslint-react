import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

/**
 * Gets nested identifiers in a node
 * @param node The AST node
 * @returns The nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  if (node.type === NodeType.Identifier) {
    identifiers.push(node);
  }
  if ("arguments" in node) {
    const chunk = node.arguments.map(getNestedIdentifiers).flat(1);
    identifiers.push(...chunk);
  }
  if ("elements" in node) {
    const chunk = node.elements.filter((x) => x !== null).map(getNestedIdentifiers).flat(1);
    identifiers.push(...chunk);
  }
  if ("properties" in node) {
    const chunk = node.properties.map(getNestedIdentifiers).flat(1);
    identifiers.push(...chunk);
  }
  if ("expressions" in node) {
    const chunk = node.expressions.map(getNestedIdentifiers).flat(1);
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
  if (node.type === NodeType.Property) {
    const chunk = getNestedIdentifiers(node.value);
    identifiers.push(...chunk);
  }
  if (node.type === NodeType.SpreadElement) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === NodeType.MemberExpression) {
    const chunk = getNestedIdentifiers(node.object);
    identifiers.push(...chunk);
  }
  if (node.type === NodeType.UnaryExpression) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === NodeType.ChainExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === NodeType.TSNonNullExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  return identifiers;
}
