import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Get all nested identifiers in a expression like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  if (node.type === AST_NODE_TYPES.Identifier) {
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
  if (node.type === AST_NODE_TYPES.Property) {
    const chunk = getNestedIdentifiers(node.value);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.SpreadElement) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.MemberExpression) {
    const chunk = getNestedIdentifiers(node.object);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.UnaryExpression) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.ChainExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.TSNonNullExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  if (node.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  return identifiers;
}
