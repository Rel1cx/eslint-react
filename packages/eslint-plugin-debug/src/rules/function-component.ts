import { getFunctionIdentifier } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// TODO: support for detecting component types listed in core/component/component-types.ts
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
      FUNCTION_COMPONENT: "function component found, name: {{name}}",
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

        for (const component of components) {
          const maybeName = component.id?.name;
          const maybeId = getFunctionIdentifier(component);
          const name = maybeName ?? maybeId?.name ?? "anonymous";

          context.report({
            data: {
              name,
            },
            messageId: "FUNCTION_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
});
