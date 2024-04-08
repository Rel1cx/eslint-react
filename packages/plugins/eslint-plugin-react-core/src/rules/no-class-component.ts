import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow class component",
    },
    messages: {
      NO_CLASS_COMPONENT: "Do not use class components. Use function components instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name, node: component } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(F.constant("anonymous"))(name),
            },
            messageId: "NO_CLASS_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
