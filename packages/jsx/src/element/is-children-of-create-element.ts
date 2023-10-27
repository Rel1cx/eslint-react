import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isCreateElementCall } from "./is-element-call";

export function isChildrenOfCreateElement(node: TSESTree.Node, context: RuleContext) {
  const maybeCallExpression = node.parent;

  if (!maybeCallExpression || !isCreateElementCall(maybeCallExpression, context)) {
    return false;
  }

  return maybeCallExpression.arguments
    .slice(2)
    .some((child) => child === node);
}
