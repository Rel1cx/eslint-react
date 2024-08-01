import { NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

export function isReactHookIdentifier(id: TSESTree.Identifier | TSESTree.MemberExpression) {
  switch (id.type) {
    case NodeType.Identifier:
      return id.name.startsWith("use");
    case NodeType.MemberExpression:
      return true
        && "name" in id.property
        && id.property.name.startsWith("use");
    default:
      return false;
  }
}
