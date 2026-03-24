import { getElementFullType } from "@eslint-react/jsx";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "no-namespace";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "noNamespace";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow JSX namespace syntax, as React does not support them.",
    },
    messages: {
      noNamespace: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener({
    JSXElement(node) {
      const name = getElementFullType(node);
      if (typeof name !== "string" || !name.includes(":")) {
        return;
      }
      context.report({
        data: {
          name,
        },
        messageId: "noNamespace",
        node: node.openingElement.name,
      });
    },
  });
}
