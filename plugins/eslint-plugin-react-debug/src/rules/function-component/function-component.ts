import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { createRule } from "../../utils/create-rule";
import { stringify } from "../../utils/stringify";

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
  const { api, visitor } = core.getFunctionComponentCollector(
    context,
    {
      collectDisplayName: true,
      hint: core.DEFAULT_COMPONENT_DETECTION_HINT,
    },
  );
  return merge(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name, displayName, flag, hookCalls, node } of api.getAllComponents(program)) {
          context.report({
            data: {
              json: stringify({
                name: name ?? "anonymous",
                displayName: displayName == null
                  ? "none"
                  : context.sourceCode.getText(displayName),
                forwardRef: (flag & core.FunctionComponentFlag.ForwardRef) > 0n,
                hookCalls: hookCalls.length,
                memo: (flag & core.FunctionComponentFlag.Memo) > 0n,
              }),
            },
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
