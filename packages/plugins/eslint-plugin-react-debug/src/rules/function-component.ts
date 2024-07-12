import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";

import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "report all function components, including anonymous ones",
    },
    messages: {
      FUNCTION_COMPONENT:
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
        for (const { name, flag, hookCalls, node } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(name, F.constant("anonymous")),
              forwardRef: Boolean(flag & ERFunctionComponentFlag.ForwardRef),
              hookCalls: hookCalls.length,
              memo: Boolean(flag & ERFunctionComponentFlag.Memo),
            },
            messageId: "FUNCTION_COMPONENT",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
