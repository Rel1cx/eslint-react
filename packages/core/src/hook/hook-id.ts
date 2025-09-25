import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isReactHookName } from "./hook-name";

export function isReactHookId(id: TSESTree.Identifier | TSESTree.MemberExpression) {
  switch (id.type) {
    case T.Identifier:
      return isReactHookName(id.name);
    case T.MemberExpression:
      return "name" in id.property
        && isReactHookName(id.property.name);
    default:
      return false;
  }
}
