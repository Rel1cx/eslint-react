import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { createRule } from "../../utils";
import { getComponentCollectorLegacy, isUnsafeComponentWillMount } from "./lib";

export const RULE_NAME = "no-unsafe-component-will-mount";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about the use of 'UNSAFE_componentWillMount' in class components.",
    },
    messages: {
      default: "Do not use 'UNSAFE_componentWillMount'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `UNSAFE_componentWillMount` is not present in the file
  if (!context.sourceCode.text.includes("UNSAFE_componentWillMount")) return {};
  const { api, visitor } = getComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of api.getAllComponents(program)) {
          const { body } = component.body;

          for (const member of body) {
            if (isUnsafeComponentWillMount(member)) {
              context.report({
                messageId: "default",
                node: member,
              });
            }
          }
        }
      },
    },
  );
}
