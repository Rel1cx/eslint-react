import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { useNoDirectSetStateInUseEffect } from "../rules-hooks/use-no-direct-set-state-in-use-effect";
import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct calls to the `set` function of `useState` in `useEffect`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseEffect: "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
  return useNoDirectSetStateInUseEffect(context, {
    onViolation(ctx, node, data) {
      ctx.report({ messageId: "noDirectSetStateInUseEffect", node, data });
    },
    useEffectKind: "useEffect",
  });
}
