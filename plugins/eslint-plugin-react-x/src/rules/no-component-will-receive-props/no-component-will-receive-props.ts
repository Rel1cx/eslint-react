/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";

export const RULE_NAME = "no-component-will-receive-props";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'componentWillReceiveProps' with 'UNSAFE_componentWillReceiveProps'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'UNSAFE_componentWillReceiveProps' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillReceiveProps` is not present in the file
  if (!context.hasText("componentWillReceiveProps")) return {};
  const { api, visitor } = core.getClassComponentCollector(context);

  return merge(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of api.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (core.isComponentWillReceiveProps(member)) {
              context.report({
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillReceiveProps");
                },
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
