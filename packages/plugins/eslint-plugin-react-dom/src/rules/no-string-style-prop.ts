import * as ER from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-style-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of string style prop.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noStringStyleProp: "Do not use string style prop. Use an object instead.",
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
      if (!ER.isHostElement(context, node)) return;
      const getAttribute = ER.getAttribute(context, node.openingElement.attributes, context.sourceCode.getScope(node));
      const attribute = getAttribute("style");
      if (attribute == null) return;
      const attributeValue = ER.resolveAttributeValue(context, attribute);
      if (typeof attributeValue.toStatic() === "string") {
        context.report({
          messageId: "noStringStyleProp",
          node: attributeValue.node ?? attribute,
        });
      }
    },
  };
}
