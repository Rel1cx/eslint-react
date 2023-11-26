import { componentCollectorLegacy } from "@eslint-react/core";
import { E, F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "class-component";

export type MessageID = "CLASS_COMPONENT";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all class components, including anonymous ones",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      CLASS_COMPONENT: "[class component] name: {{name}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollectorLegacy(context);

    return {
      ...listeners,
      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          console.error(maybeComponents.left);

          return;
        }
        const components = maybeComponents.right;

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
});
