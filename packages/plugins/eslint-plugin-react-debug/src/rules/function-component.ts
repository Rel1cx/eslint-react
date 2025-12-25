import { ComponentFlag, DEFAULT_COMPONENT_DETECTION_HINT, useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule, stringify } from "../utils";

export const RULE_NAME = "function-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all function components in json format.",
    },
    messages: {
      functionComponent: "{{json}}",
      // "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}, displayName: {{displayName}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = useComponentCollector(
    context,
    {
      collectDisplayName: true,
      collectHookCalls: true,
      hint: DEFAULT_COMPONENT_DETECTION_HINT,
    },
  );
  return {
    ...listeners,
    "Program:exit"(program) {
      for (const { name = "anonymous", node, displayName, flag, hookCalls } of ctx.getAllComponents(program)) {
        context.report({
          messageId: "functionComponent",
          node,
          data: {
            json: stringify({
              name,
              displayName: displayName == null
                ? "none"
                : context.sourceCode.getText(displayName),
              forwardRef: (flag & ComponentFlag.ForwardRef) > 0n,
              hookCalls: hookCalls.length,
              memo: (flag & ComponentFlag.Memo) > 0n,
            }),
          },
        });
      }
    },
  };
}
