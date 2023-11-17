import { hookCollector } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";
export const RULE_NAME = "react-hooks";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all react hooks",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      REACT_HOOKS: "React hook found, name: {{name}}, cost: {{cost}}",
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
          context.report({
            data: {
              name,
              cost,
            },
            messageId: "REACT_HOOKS",
            node,
          });
        }
      },
    };
  },
});
