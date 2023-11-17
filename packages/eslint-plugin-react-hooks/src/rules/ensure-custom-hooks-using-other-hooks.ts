import { hookCollector } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-custom-hooks-using-other-hooks";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce custom hooks using other hooks",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS: "Custom hooks {{name}} should use other hooks",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = hookCollector(context);

    return {
      ...listeners,
      "Program:exit"() {
        const maybeAllHooks = ctx.getAllHooks();
        if (E.isLeft(maybeAllHooks)) {
          console.error(maybeAllHooks.left);

          return;
        }

        const allHooks = maybeAllHooks.right;
        for (const { name, cost, node } of allHooks.values()) {
          if (cost > 1) {
            continue;
          }

          context.report({
            data: {
              name,
            },
            messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
            node,
          });
        }
      },
    };
  },
});
