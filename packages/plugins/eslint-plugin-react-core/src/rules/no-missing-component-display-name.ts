import { getFunctionIdentifier } from "@eslint-react/ast";
import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-component-display-name";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'displayName' for memo and forwardRef components",
      requiresTypeChecking: false,
    },
    messages: {
      NO_MISSING_COMPONENT_DISPLAY_NAME: "Add missing 'displayName' for component.",
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

        for (const { displayName, flag, node } of components.values()) {
          const isMemoOrForwardRef = Boolean(flag & ERFunctionComponentFlag.ForwardRef)
            || Boolean(flag & ERFunctionComponentFlag.Memo);
          if (O.isSome(getFunctionIdentifier(node))) continue;
          if (!isMemoOrForwardRef) continue;
          if (O.isNone(displayName)) {
            context.report({
              messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
              node,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
