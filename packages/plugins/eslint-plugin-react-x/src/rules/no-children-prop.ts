import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow passing `children` as a prop.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noChildrenProp: "Do not pass 'children' as props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node) {
      const attributes = node.openingElement.attributes;
      const childrenProp = ER.getAttribute(context, "children", attributes, context.sourceCode.getScope(node));
      if (childrenProp != null) {
        context.report({
          messageId: "noChildrenProp",
          node: childrenProp,
        });
      }
    },
  };
}
