import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule, stringify } from "../../utils";

export const RULE_NAME = "function-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all function components in JSON format.",
    },
    messages: {
      default: "{{json}}",
      // "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}, displayName: {{displayName}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { ctx, visitor } = core.useComponentCollector(
    context,
    {
      collectDisplayName: true,
      hint: core.DEFAULT_COMPONENT_DETECTION_HINT,
    },
  );
  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name = "anonymous", node, displayName, flag, hookCalls } of ctx.getAllComponents(program)) {
          context.report({
            messageId: "default",
            node,
            data: {
              json: stringify({
                name,
                displayName: displayName == null
                  ? "none"
                  : context.sourceCode.getText(displayName),
                forwardRef: (flag & core.ComponentFlag.ForwardRef) > 0n,
                hookCalls: hookCalls.length,
                memo: (flag & core.ComponentFlag.Memo) > 0n,
              }),
            },
          });
        }
      },
    },
  );
}
