import { useComponentCollectorLegacy } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "class-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all class components, including anonymous ones",
    },
    messages: {
      classComponent: "[class component] name: {{name}}.",
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
            messageId: "classComponent",
            node: component,
            data: {
              name: O.getOrElse(F.constant("anonymous"))(name),
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
