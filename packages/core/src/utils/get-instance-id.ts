/** eslint-disable jsdoc/require-param */
import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Gets the identifier node of an instance based on AST node relationships.
 * Used for tracking where hooks or components are being assigned in the code.
 * @param node The current AST node to evaluate
 * @internal
 */
export function getInstanceId(node: TSESTree.Node) {
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
      return getInstanceId(node.parent);
  }
}
