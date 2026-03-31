import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Finds the enclosing assignment target (variable, property, etc.) for a given node
 *
 * @param node The starting node
 * @returns The enclosing assignment target node, or null if not found
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

    // Case: export default declaration (export default new ResizeObserver())
    case node.type === AST.ExportDefaultDeclaration:
      return node.declaration;

    // Case: reached block scope boundary or program root
    case node.type === AST.BlockStatement
      || node.type === AST.Program:
      return null;

    // Continue traversing up the AST until we find an identifier
    default:
      return findEnclosingAssignmentTarget(node.parent);
  }
}

/**
 * Type representing the possible assignment targets returned by `findEnclosingAssignmentTarget`
 */
export type AssignmentTarget = ReturnType<typeof findEnclosingAssignmentTarget>;
