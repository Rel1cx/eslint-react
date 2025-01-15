import type * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

export function getAttributeStaticValue(
  node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  initialScope: Scope,
): VAR.StaticValue {
  switch (node.type) {
    case T.JSXAttribute:
      if (node.value?.type === T.Literal) {
        return {
          kind: "some",
          node: node.value,
          initialScope,
          value: node.value.value,
        } as const;
      }
      if (node.value?.type === T.JSXExpressionContainer) {
        return {
          kind: "lazy",
          node: node.value.expression,
          initialScope,
        } as const;
      }
      return { kind: "none", node, initialScope } as const;
    case T.JSXSpreadAttribute:
      return {
        kind: "lazy",
        node: node.argument,
        initialScope,
      } as const;
    default:
      return { kind: "none", node, initialScope } as const;
  }
}
