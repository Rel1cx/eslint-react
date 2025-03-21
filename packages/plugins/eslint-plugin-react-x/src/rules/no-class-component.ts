import { isComponentDidCatch, isGetDerivedStateFromError, useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow class components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noClassComponent: "Do not use class components. Use function components instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("Component")) return {};
  const { ctx, listeners } = useComponentCollectorLegacy();
  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);
      for (const { name = "anonymous", node: component } of components.values()) {
        if (component.body.body.some((m) => isComponentDidCatch(m) || isGetDerivedStateFromError(m))) {
          continue;
        }
        context.report({
          messageId: "noClassComponent",
          node: component,
          data: {
            name,
          },
        });
      }
    },
  };
}
