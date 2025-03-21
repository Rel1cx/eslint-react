import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-duplicate-jsx-props";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow duplicate props in JSX elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDuplicateJsxProps: "This JSX property is assigned multiple times.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXOpeningElement(node) {
      const props: string[] = [];
      for (const attr of node.attributes) {
        if (attr.type === T.JSXSpreadAttribute) {
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
          messageId: "noDuplicateJsxProps",
          node: attr,
        });
      }
    },
  };
}
