import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "no-class-component";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows class components except for error boundaries.",
    },
    messages: {
      default: "Avoid using class components. Use function components instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `Component` is not present in the file
  if (!context.sourceCode.text.includes("Component")) return {};
  const { ctx, visitor } = core.useComponentCollectorLegacy(context);
  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name = "anonymous", node: component } of ctx.getAllComponents(program)) {
          if (component.body.body.some((m) => core.isComponentDidCatch(m) || core.isGetDerivedStateFromError(m))) {
            continue;
          }
          context.report({
            data: {
              name,
            },
            messageId: "default",
            node: component,
          });
        }
      },
    },
  );
}
