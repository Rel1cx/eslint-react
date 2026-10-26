import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/** The possible assignment targets returned by {@link resolveEnclosingAssignmentTarget}. */
export type EnclosingAssignmentTarget =
  | TSESTree.DefaultExportDeclarations
  | TSESTree.PropertyName
  | null;

/**
 * Get the parent of a node, or `undefined` when the node is detached.
 *
 * The parser attaches parent pointers to every node except `Program`, but
 * callers may pass synthetic nodes that were never attached to a tree.
 * @param node The node to inspect.
 * @returns The parent node, or `undefined` when there is none.
 */
function getParent(node: TSESTree.Node): TSESTree.Node | undefined {
  return node.parent;
}

/**
 * Resolve the enclosing assignment target (variable, property, etc.) of the node.
 * @param node The starting node for the upward search.
 * @returns The enclosing assignment target node, or `null` when not found.
 */
export function resolveEnclosingAssignmentTarget(node: TSESTree.Node): EnclosingAssignmentTarget {
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
    default: {
      const parent = getParent(node);
      if (parent == null) return null;
      return resolveEnclosingAssignmentTarget(parent);
    }
  }
}
