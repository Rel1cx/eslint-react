import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isReactHookIdentifier(id: TSESTree.Identifier | TSESTree.MemberExpression) {
  switch (id.type) {
    case T.Identifier:
      return id.name.startsWith("use");
    case T.MemberExpression:
      return "name" in id.property
        && id.property.name.startsWith("use");
    default:
      return false;
  }
}
