import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { isHookName } from "./hook-name";

/**
 * Checks if the given node is a hook identifier
 * @param id The AST node to check
 * @returns `true` if the node is a hook identifier or member expression with hook name, `false` otherwise
 */
export function isHookId(id: TSESTree.Node): id is TSESTree.Identifier | TSESTree.MemberExpression {
  switch (id.type) {
    case AST.Identifier:
      return isHookName(id.name);
    case AST.MemberExpression:
      return "name" in id.property
        && isHookName(id.property.name);
    default:
      return false;
  }
}
