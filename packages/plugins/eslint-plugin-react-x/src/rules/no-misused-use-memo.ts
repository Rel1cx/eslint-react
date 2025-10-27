import * as AST from "@eslint-react/ast";
import { isUseMemoCall } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { SIDE_EFFECT_FUNCTION_NAMES } from "@eslint-react/shared";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-misused-use-memo";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents incorrect usage of `useMemo`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMisusedUseMemo: "`useMemo` must have no side effects and return a value.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useMemo` is not present in the file
  if (!context.sourceCode.text.includes("useMemo")) return {};

  const state = {
    isWithinUseMemo: false,
  };

  return {
    CallExpression(node) {
      if (isUseMemoCall(node)) {
        state.isWithinUseMemo = true;
      }
      if (!state.isWithinUseMemo) return;
      const name = match(node.callee)
        .with({ type: T.Identifier }, (n) => n.name)
        .with({ type: T.MemberExpression, property: { type: T.Identifier } }, (n) => n.property.name)
        .otherwise(() => null);
      if (name == null) return;
      if (!SIDE_EFFECT_FUNCTION_NAMES.some((effectName) => name.startsWith(effectName))) return;
      context.report({
        messageId: "noMisusedUseMemo",
        node,
      });
    },
    "CallExpression:exit"(node) {
      if (isUseMemoCall(node)) {
        state.isWithinUseMemo = false;
      }
    },
  };
}
