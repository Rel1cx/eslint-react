import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Resolve the enclosing assignment target (variable, property, etc.) of a node.
 *
 * @param node The starting node.
 * @returns The enclosing assignment target node, or `null` if not found.
 */
export function resolveEnclosingAssignmentTarget(node: TSESTree.Node) {
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
      return resolveEnclosingAssignmentTarget(node.parent);
  }
}

/** The possible assignment targets returned by {@link resolveEnclosingAssignmentTarget}. */
export type AssignmentTarget = ReturnType<typeof resolveEnclosingAssignmentTarget>;
