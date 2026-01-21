/** eslint-disable jsdoc/require-param */
import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
    case node.type === T.VariableDeclarator:
      return node.id;

    // Case: assignment expression (x = new ResizeObserver())
    case node.type === T.AssignmentExpression:
      return node.left;

    // Case: class property definition (class X { y = new ResizeObserver() })
    case node.type === T.PropertyDefinition:
      return node.key;

    // Case: reached block scope boundary or program root
    case node.type === T.BlockStatement
      || node.type === T.Program
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
