import { componentCollectorLegacy } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `class component`",
    },
    schema: [],
    messages: {
      NO_CLASS_COMPONENT: "[class component] name: {{name}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollectorLegacy(context);

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
}) satisfies ESLintUtils.RuleModule<MessageID>;
