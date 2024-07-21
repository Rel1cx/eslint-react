import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

/**
 * Gets nested return statements in a node
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const returnStatements: TSESTree.ReturnStatement[] = [];
  if (node.type === NodeType.ReturnStatement) {
    returnStatements.push(node);
  }
  if ("body" in node && node.body !== undefined && node.body !== null) {
    const chunk = Array.isArray(node.body)
      ? node.body.map(getNestedReturnStatements).flat(1)
      : getNestedReturnStatements(node.body);
    returnStatements.push(...chunk);
  }
  if ("consequent" in node) {
    const chunk = Array.isArray(node.consequent)
      ? node.consequent.map(getNestedReturnStatements).flat(1)
      : getNestedReturnStatements(node.consequent);
    returnStatements.push(...chunk);
  }
  if ("alternate" in node && node.alternate !== null) {
    const chunk = Array.isArray(node.alternate)
      ? node.alternate.map(getNestedReturnStatements).flat(1)
      : getNestedReturnStatements(node.alternate);
    returnStatements.push(...chunk);
  }
  if ("cases" in node) {
    const chunk = node.cases.map(getNestedReturnStatements).flat(1);
    returnStatements.push(...chunk);
  }
  if ("block" in node) {
    returnStatements.push(...getNestedReturnStatements(node.block));
  }
  if ("handler" in node && node.handler !== null) {
    returnStatements.push(...getNestedReturnStatements(node.handler));
  }
  if ("finalizer" in node && node.finalizer !== null) {
    returnStatements.push(...getNestedReturnStatements(node.finalizer));
  }
  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    returnStatements.push(...getNestedReturnStatements(node.expression));
  }
  if ("test" in node && node.test !== null) {
    returnStatements.push(...getNestedReturnStatements(node.test));
  }
  return returnStatements;
}
