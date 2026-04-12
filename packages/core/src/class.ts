import type { TSESTreeClass } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get the class identifier of a class node
 * @param node The class node to get the identifier from
 * @returns The class identifier or null if not found
 */
export function getClassId(node: TSESTreeClass): TSESTree.BindingName | null {
  if (node.id != null) return node.id;
  if (node.parent.type === AST.VariableDeclarator) {
    return node.parent.id;
  }
  return null;
}
