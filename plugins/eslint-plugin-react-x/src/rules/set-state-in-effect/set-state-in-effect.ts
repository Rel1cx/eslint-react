import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";

export const RULE_NAME = "set-state-in-effect";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against setting state synchronously in an effect, which can lead to re-renders that degrade performance.",
    },
    messages: {
      default:
        "Do not call the 'set' function '{{name}}' of 'useState' synchronously in an effect. This can lead to unnecessary re-renders and performance issues.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const { additionalEffectHooks, additionalStateHooks } = getSettingsFromContext(context);
  const facts = createFactCollector(additionalStateHooks, additionalEffectHooks);

  return merge(
    facts.visitor,
    {
      "Program:exit"() {
        for (const violation of inferViolations(context, facts.facts)) {
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
