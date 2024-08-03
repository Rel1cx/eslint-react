import { NodeType } from "@eslint-react/ast";
import type { ESLintReactSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isFromHookCall } from "./is-from-hook-call";

export function isFromUseStateCall(context: RuleContext, settings: ESLintReactSettings) {
  return (toplevelId: TSESTree.Identifier) =>
    isFromHookCall("useState", context, settings, (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => {
      const { parent } = call;
      if (!("id" in parent && parent.id?.type === NodeType.ArrayPattern)) return true;
      return parent.id.elements.findIndex(e => e?.type === NodeType.Identifier && e.name === topLevelId.name) === 1;
    })(toplevelId);
}
