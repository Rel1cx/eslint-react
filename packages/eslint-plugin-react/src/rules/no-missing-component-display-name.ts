import { componentCollector, ExRFunctionComponentFlag } from "@eslint-react/core";
import { E, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-component-display-name";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "require `displayName` for memo and forwardRef components",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_MISSING_COMPONENT_DISPLAY_NAME: "no missing display name",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);

    return {
      ...listeners,
      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          console.error(maybeComponents.left);

          return;
        }
        const components = maybeComponents.right;

        for (const { displayName, flag, node } of components.values()) {
          const hasDisplayName = O.isSome(displayName);
          const isMemoOrForwardRef = flag & ExRFunctionComponentFlag.ForwardRef
            || flag & ExRFunctionComponentFlag.Memo;

          if (!hasDisplayName && isMemoOrForwardRef) {
            context.report({
              messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
              node,
            });
          }
        }
      },
    };
  },
});
