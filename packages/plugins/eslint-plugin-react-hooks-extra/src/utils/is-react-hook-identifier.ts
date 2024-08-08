import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isReactHookIdentifier(id: TSESTree.Identifier | TSESTree.MemberExpression) {
  switch (id.type) {
    case AST_NODE_TYPES.Identifier:
      return id.name.startsWith("use");
    case AST_NODE_TYPES.MemberExpression:
      return "name" in id.property
        && id.property.name.startsWith("use");
    default:
      return false;
  }
}
