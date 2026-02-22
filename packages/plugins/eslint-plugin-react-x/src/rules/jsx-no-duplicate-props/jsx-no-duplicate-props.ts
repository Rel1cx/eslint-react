import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "jsx-no-duplicate-props";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows duplicate props in JSX elements.",
    },
    messages: {
      default: "This JSX property is assigned multiple times.",
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
      JSXOpeningElement(node) {
        const props: string[] = [];
        for (const attr of node.attributes) {
          if (attr.type === AST.JSXSpreadAttribute) {
            continue;
          }
          const name = attr.name.name;
          if (typeof name !== "string") {
            continue;
          }
          if (!props.includes(name)) {
            props.push(name);
            continue;
          }
          context.report({
            messageId: "default",
            node: attr,
          });
        }
      },
    },
  );
}
