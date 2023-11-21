import { componentCollector } from "@eslint-react/core";
import { E, F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all function components, including anonymous ones",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      FUNCTION_COMPONENT: "function component found, name: {{name}}, displayName: {{displayName}}",
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

        for (const { name, displayName, node } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(name, F.constant("anonymous")),
              displayName: O.getOrElse(displayName, F.constant("none")),
            },
            messageId: "FUNCTION_COMPONENT",
            node,
          });
        }
      },
    };
  },
});
