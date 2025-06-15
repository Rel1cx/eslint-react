import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { useNoDirectSetStateInUseEffect } from "../rules-hooks/use-no-direct-set-state-in-use-effect";
import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-effect";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow unnecessary use of 'useEffect'.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      // TODO: Align the error messages with the scenarios described in react.dev/learn/you-might-not-need-an-effect.
      noUnnecessaryUseEffect:
        "You Might Not Need an Effect. Visit https://react.dev/learn/you-might-not-need-an-effect to learn how to remove unnecessary Effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const noDirectSetStateInUseEffectListeners = useNoDirectSetStateInUseEffect(context, {
    onViolation(ctx, node, data) {
      ctx.report({ messageId: "noUnnecessaryUseEffect", node, data });
    },
    useEffectKind: "useEffect",
  });

  // TODO: Implement the logic to check and report other scenarios described in react.dev/learn/you-might-not-need-an-effect.

  return {
    ...noDirectSetStateInUseEffectListeners,
  };
}
