import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";

import { createRule } from "../utils";

export const RULE_NAME = "class-component";

export type MessageID = "CLASS_COMPONENT";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "report all class components, including anonymous ones",
    },
    messages: {
      CLASS_COMPONENT: "[class component] name: {{name}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name, node: component } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(F.constant("anonymous"))(name),
            },
            messageId: "CLASS_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
