import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
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
}) satisfies ESLintUtils.RuleModule<MessageID>;
