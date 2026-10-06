import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";

export const RULE_NAME = "use-memo";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "no-parameters"
  | "no-async-or-generator-functions"
  | "no-reassigning-outer-variables"
  | "must-return-a-value"
  | "result-must-be-used";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that 'useMemo' is called with a callback that returns a value.",
    },
    messages: {
      "must-return-a-value":
        "useMemo() callbacks must return a value.\n\nThis useMemo() callback doesn't return a value. useMemo() is for computing and caching values, not for arbitrary side effects.",
      "no-async-or-generator-functions":
        "useMemo() callbacks may not be async or generator functions.\n\nuseMemo() callbacks are called once and must synchronously return a value.",
      "no-parameters":
        "useMemo() callbacks may not accept parameters.\n\nuseMemo() callbacks are called by React to cache calculations across re-renders. They should not take parameters. Instead, directly reference the props, state, or local variables needed for the computation.",
      "no-reassigning-outer-variables":
        "useMemo() callbacks may not reassign variables declared outside of the callback.\n\nuseMemo() callbacks must be pure functions and cannot reassign variables defined outside of the callback function.",
      "result-must-be-used":
        "useMemo() result is unused.\n\nThis useMemo() value is unused. useMemo() is for computing and caching values, not for arbitrary side effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("useMemo")) return {};
  const facts = createFactCollector(core.isUseMemoCall(context));
  return merge(
    facts.visitor,
    {
      "Program:exit"() {
        for (const violation of inferViolations(context, facts.facts)) {
          context.report({
            messageId: violation.kind,
            node: violation.node,
          });
        }
      },
    },
  );
}
