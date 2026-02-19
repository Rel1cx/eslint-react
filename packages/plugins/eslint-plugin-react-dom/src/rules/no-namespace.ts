import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the absence of a 'namespace' in React elements.",
    },
    messages: {
      default: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      JSXElement(node) {
        const name = core.getJsxElementType(context, node);
        if (typeof name !== "string" || !name.includes(":")) {
          return;
        }
        context.report({
          messageId: "default",
          node: node.openingElement.name,
          data: {
            name,
          },
        });
      },
    },
  );
}
