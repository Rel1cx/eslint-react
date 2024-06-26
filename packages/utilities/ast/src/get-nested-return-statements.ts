/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

/**
 * Gets nested return statements in a node
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(
  node: TSESTree.Node,
): Array<TSESTree.ReturnStatement> {
  const returnStatements: Array<TSESTree.ReturnStatement> = [];

  if (node.type === NodeType.ReturnStatement) {
    returnStatements.push(node);
  }

  if ("body" in node && node.body !== undefined && node.body !== null) {
    Array.isArray(node.body)
      ? node.body.forEach((x) => {
        returnStatements.push(...getNestedReturnStatements(x));
      })
      : returnStatements.push(
        ...getNestedReturnStatements(node.body),
      );
  }

  if ("consequent" in node) {
    Array.isArray(node.consequent)
      ? node.consequent.forEach((x) => {
        returnStatements.push(...getNestedReturnStatements(x));
      })
      : returnStatements.push(
        ...getNestedReturnStatements(node.consequent),
      );
  }

  if ("alternate" in node && node.alternate !== null) {
    Array.isArray(node.alternate)
      ? node.alternate.forEach((x: TSESTree.Node) => {
        returnStatements.push(...getNestedReturnStatements(x));
      })
      : returnStatements.push(
        ...getNestedReturnStatements(node.alternate),
      );
  }

  if ("cases" in node) {
    node.cases.forEach((x) => {
      returnStatements.push(...getNestedReturnStatements(x));
    });
  }

  if ("block" in node) {
    returnStatements.push(...getNestedReturnStatements(node.block));
  }

  if ("handler" in node && node.handler !== null) {
    returnStatements.push(...getNestedReturnStatements(node.handler));
  }

  if ("finalizer" in node && node.finalizer !== null) {
    returnStatements.push(
      ...getNestedReturnStatements(node.finalizer),
    );
  }

  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    returnStatements.push(
      ...getNestedReturnStatements(node.expression),
    );
  }

  if ("test" in node && node.test !== null) {
    returnStatements.push(...getNestedReturnStatements(node.test));
  }

  return returnStatements;
}
