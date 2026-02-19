/** eslint-disable jsdoc/require-param */
import * as ast from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isValueEqual } from "./value-equality";

/**
 * Finds the enclosing assignment target (variable, property, etc.) for a given node
 *
 * @todo Verify correctness and completeness of this function
 * @param node The starting node
 * @returns The enclosing assignment target node, or undefined if not found
 */
export function findEnclosingAssignmentTarget(node: TSESTree.Node) {
  switch (true) {
    // Case: variable declaration (const x = new ResizeObserver())
    case node.type === AST.VariableDeclarator:
      return node.id;

    // Case: assignment expression (x = new ResizeObserver())
    case node.type === AST.AssignmentExpression:
      return node.left;

    // Case: class property definition (class X { y = new ResizeObserver() })
    case node.type === AST.PropertyDefinition:
      return node.key;

    // Case: reached block scope boundary or program root
    case node.type === AST.BlockStatement
      || node.type === AST.Program
      || node.parent === node:
      return unit;

    // Continue traversing up the AST until we find an identifier
    default:
      return findEnclosingAssignmentTarget(node.parent);
  }
}

/**
 * Type representing the possible assignment targets returned by `findEnclosingAssignmentTarget`
 */
export type AssignmentTarget = ReturnType<typeof findEnclosingAssignmentTarget>;

/**
 * Check if two assignment targets are equal
 * Compares nodes directly or by their values
 * @param context The rule context
 * @param a The first node to compare
 * @param b The second node to compare
 * @returns True if the assignment targets are equal
 * @internal
 */
export function isAssignmentTargetEqual(
  context: RuleContext,
  a: TSESTree.Node,
  b: TSESTree.Node,
) {
  return ast.isNodeEqual(a, b) || isValueEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
