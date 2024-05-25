import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";

import type { TSESTreeClass } from "../../ast-node";
import { NodeType } from "../../ast-node";

/**
 * Gets class identifier from ClassDeclaration or ClassExpression
 * @param node The AST node to check
 * @returns class identifier or null
 */
export function getClassIdentifier(node: TSESTreeClass): O.Option<TSESTree.Identifier> {
  if (node.id) return O.fromNullable(node.id);
  if (node.parent.type === NodeType.VariableDeclarator && node.parent.id.type === NodeType.Identifier) {
    return O.fromNullable(node.parent.id);
  }

  return O.none();
}
