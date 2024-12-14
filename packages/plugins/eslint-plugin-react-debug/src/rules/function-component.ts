import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
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
    },
    messages: {
      functionComponent:
        "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}",
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
        for (const { name, node, flag, hookCalls } of components.values()) {
          context.report({
            messageId: "functionComponent",
            node,
            data: {
              name: O.getOrElse(name, F.constant("anonymous")),
              forwardRef: Boolean(flag & ERFunctionComponentFlag.ForwardRef),
              hookCalls: hookCalls.length,
              memo: Boolean(flag & ERFunctionComponentFlag.Memo),
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
