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
      description: "Enforces that the 'key' prop is placed before the spread prop in JSX elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxKeyBeforeSpread: "The 'key' prop must be placed before any spread props.",
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
      // Find the index of the first spread prop
      let firstSpreadPropIndex: null | number = null;
      for (const [index, prop] of node.attributes.entries()) {
        // Check if the prop is a spread prop
        if (prop.type === T.JSXSpreadAttribute) {
          // Store the index of the first spread prop found
          firstSpreadPropIndex ??= index;
          continue;
        }
        // If no spread prop has been found yet, continue to the next prop
        if (firstSpreadPropIndex == null) {
          continue;
        }
        // If a 'key' prop is found after a spread prop, report an error
        if (prop.name.name === "key" && index > firstSpreadPropIndex) {
          context.report({
            messageId: "jsxKeyBeforeSpread",
            node: prop,
          });
        }
      }
    },
  };
}
