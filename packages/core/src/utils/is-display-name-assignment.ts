import type { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * The ESQuery selector for a component display name assignment expression
 */
export const DISPLAY_NAME_ASSIGNMENT_SELECTOR = [
  "AssignmentExpression",
  "[type]",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");

/**
 * Check if the node is a component display name assignment expression
 * @param node The AST node
 * @returns `true` if the node is a component display name assignment
 */
export function isDisplayNameAssignment(node: TSESTree.Node | _): node is TSESTree.AssignmentExpression {
  if (node == null) return false;
  return node.type === T.AssignmentExpression
    && node.operator === "="
    && node.left.type === T.MemberExpression
    && node.left.property.type === T.Identifier
    && node.left.property.name === "displayName";
}
