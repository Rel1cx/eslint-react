import { getClassIdentifier } from "@eslint-react/ast";
import { componentCollectorLegacy } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce that there are no class components",
    },
    schema: [],
    messages: {
      NO_CLASS_COMPONENT: "class component found, name: {{name}}",
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
          return;
        }
        const components = maybeComponents.right;

        for (const component of components) {
          context.report({
            data: {
              name: getClassIdentifier(component)?.name ?? "anonymous",
            },
            messageId: "NO_CLASS_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
});
