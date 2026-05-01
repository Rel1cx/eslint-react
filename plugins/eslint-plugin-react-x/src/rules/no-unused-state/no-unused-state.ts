import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature } from "@eslint-react/eslint";

export const RULE_NAME = "no-unused-state";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about state variables that are defined but never used, or only used in effects.",
    },
    messages: {
      default: "State variable '{{name}}' is assigned but never used, or only used in effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(_: RuleContext<MessageID, []>) {
  // TODO: Not implemented yet
  return {};
}
