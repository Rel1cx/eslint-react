import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

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
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all function components, including anonymous ones",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      functionComponent:
        "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { name = "anonymous", node, flag, hookCalls } of components.values()) {
          context.report({
            messageId: "functionComponent",
            node,
            data: {
              name,
              forwardRef: (flag & ERFunctionComponentFlag.ForwardRef) > 0n,
              hookCalls: hookCalls.length,
              memo: (flag & ERFunctionComponentFlag.Memo) > 0n,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
