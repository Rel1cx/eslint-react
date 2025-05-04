import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-key-before-spread";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that the 'key' attribute is placed before the spread attribute in JSX elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxKeyBeforeSpread: "The 'key' attribute must be placed before the spread attribute.",
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
      let firstSpreadAttributeIndex: null | number = null;
      for (const [index, attr] of node.attributes.entries()) {
        if (attr.type === T.JSXSpreadAttribute) {
          firstSpreadAttributeIndex ??= index;
          continue;
        }
        if (attr.name.name === "key" && firstSpreadAttributeIndex != null && index > firstSpreadAttributeIndex) {
          context.report({
            messageId: "jsxKeyBeforeSpread",
            node: attr,
          });
        }
      }
    },
  };
}
