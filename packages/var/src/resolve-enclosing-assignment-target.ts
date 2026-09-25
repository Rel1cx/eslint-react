import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/** The possible assignment targets returned by {@link resolveEnclosingAssignmentTarget}. */
export type EnclosingAssignmentTarget = ReturnType<typeof resolveEnclosingAssignmentTarget>;

/**
 * Resolve the enclosing assignment target (variable, property, etc.) of the node.
 * @param node The starting node for the upward search.
 * @returns The enclosing assignment target node, or `null` when not found.
 */
export function resolveEnclosingAssignmentTarget(node: TSESTree.Node) {
  switch (node.type) {
    // Variable declaration (const x = new ResizeObserver())
    case AST.VariableDeclarator:
      return node.id;

    // Assignment expression (x = new ResizeObserver())
    case AST.AssignmentExpression:
      return node.left;

    // Class property definition (class X { y = new ResizeObserver() })
    case AST.PropertyDefinition:
      return node.key;

    // Export default declaration (export default new ResizeObserver())
    case AST.ExportDefaultDeclaration:
      return node.declaration;

    // Reached block scope boundary or program root
    case AST.BlockStatement:
    case AST.Program:
      return null;

    // Continue traversing up the AST until an assignment target is found
    default:
      return resolveEnclosingAssignmentTarget(node.parent);
  }
}
