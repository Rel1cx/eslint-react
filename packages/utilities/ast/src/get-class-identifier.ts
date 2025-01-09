import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { TSESTreeClass } from "./types";

/**
 * Gets class identifier from ClassDeclaration or ClassExpression
 * @param node The AST node to check
 * @returns class identifier or null
 */
export function getClassIdentifier(node: TSESTreeClass): O.Option<TSESTree.Identifier> {
  if (node.id != null) {
    return O.fromNullable(node.id);
  }
  if (node.parent.type === T.VariableDeclarator && node.parent.id.type === T.Identifier) {
    return O.fromNullable(node.parent.id);
  }

  return O.none();
}
