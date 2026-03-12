import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "prefer-set-state-callback";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforces using the callback form of a 'useState' setter when the update references the corresponding state variable, to prevent stale state bugs.",
    },
    messages: {
      default:
        "Use the callback form of '{{name}}' to ensure the update is based on the latest state.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(_context: RuleContext<MessageID, []>) {
  return defineRuleListener({});
}
