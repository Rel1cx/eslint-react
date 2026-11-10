import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";
import { isComponentOrHookLikeFunction } from "./helpers";

export const RULE_NAME = "set-state-in-render";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.",
    },
    messages: {
      default: "Do not call the 'set' function '{{name}}' unconditionally during render. This will trigger an infinite render loop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { additionalStateHooks } = getSettingsFromContext(context);
  const { facts, visitor } = createFactCollector(additionalStateHooks, (node) => isComponentOrHookLikeFunction(context, node));
  return merge(
    visitor,
    {
      // Defer inference until the whole file has been traversed so that all call and early-return facts are complete
      "Program:exit"() {
        for (const violation of inferViolations(context, facts)) {
          context.report({
            data: { name: violation.name },
            messageId: "default",
            node: violation.node,
          });
        }
      },
    },
  );
}
