import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { useNoDirectSetStateInUseEffect } from "../hooks/use-no-direct-set-state-in-use-effect";
import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-layout-effect";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct calls to the `set` function of `useState` in `useLayoutEffect`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseLayoutEffect:
        "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useLayoutEffect'.",
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
      ctx.report({ messageId: "noDirectSetStateInUseLayoutEffect", node, data });
    },
    useEffectKind: "useLayoutEffect",
  });
}
