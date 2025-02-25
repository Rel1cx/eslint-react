import type { ESLintReactSettingsNormalized, RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isFromHookCall } from "./is-from-hook-call";

export function isFromUseStateCall(context: RuleContext, settings: ESLintReactSettingsNormalized) {
  const predicate = (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => {
    const { parent } = call;
    if (!("id" in parent) || parent.id?.type !== T.ArrayPattern) {
      return true;
    }
    return parent.id.elements.findIndex((e) => e?.type === T.Identifier && e.name === topLevelId.name) === 1;
  };
  return isFromHookCall(context, "useState", settings, predicate);
}
