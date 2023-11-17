import { getClassIdentifier } from "@eslint-react/ast";
import { componentCollectorLegacy } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "class-component";

export type MessageID = "CLASS_COMPONENT";

// TODO: support for detecting component types listed in core/component/component-types.ts
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
      CLASS_COMPONENT: "class component found, name: {{name}}",
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

        for (const { node: component } of components.values()) {
          const maybeName = component.id?.name;
          const maybeId = getClassIdentifier(component);
          const name = maybeName ?? maybeId?.name ?? "anonymous";
          context.report({
            data: {
              name,
            },
            messageId: "CLASS_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
});
