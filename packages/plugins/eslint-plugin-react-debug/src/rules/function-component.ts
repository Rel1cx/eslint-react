import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "report all function components, including anonymous ones",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      FUNCTION_COMPONENT:
        "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, hookCalls: {{hookCalls}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name, flag, node, hookCalls } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(name, F.constant("anonymous")),
              forwardRef: Boolean(flag & ERFunctionComponentFlag.ForwardRef),
              memo: Boolean(flag & ERFunctionComponentFlag.Memo),
              hookCalls: hookCalls.length,
            },
            messageId: "FUNCTION_COMPONENT",
            node,
          });
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
