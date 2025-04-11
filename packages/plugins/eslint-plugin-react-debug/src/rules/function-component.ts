import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all function components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      functionComponent:
        "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}, displayName: {{displayName}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useComponentCollector(
    context,
    {
      collectDisplayName: true,
      collectHookCalls: true,
      hint: ER.DEFAULT_COMPONENT_DETECTION_HINT,
    },
  );
  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);
      for (const { name = "anonymous", node, displayName, flag, hookCalls } of components.values()) {
        context.report({
          messageId: "functionComponent",
          node,
          data: {
            name,
            displayName: displayName != null ? context.sourceCode.getText(displayName) : "none",
            forwardRef: (flag & ER.ComponentFlag.ForwardRef) > 0n,
            hookCalls: hookCalls.length,
            memo: (flag & ER.ComponentFlag.Memo) > 0n,
          },
        });
      }
    },
  };
}
