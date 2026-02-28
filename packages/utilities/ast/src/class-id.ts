import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import type { TSESTreeClass } from "./node-types";

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
