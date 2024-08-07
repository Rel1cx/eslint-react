import type { ESLintReactSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isFromHookCall } from "./is-from-hook-call";

export function isFromUseStateCall(context: RuleContext, settings: ESLintReactSettings) {
  const predicate = (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => {
    const { parent } = call;
    if (!("id" in parent && parent.id?.type === AST_NODE_TYPES.ArrayPattern)) return true;
    return parent.id.elements.findIndex(e => e?.type === AST_NODE_TYPES.Identifier && e.name === topLevelId.name) === 1;
  };
  return isFromHookCall("useState", context, settings, predicate);
}
