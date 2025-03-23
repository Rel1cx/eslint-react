import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as JSX from "@eslint-react/jsx";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `dangerouslySetInnerHTML`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDangerouslySetInnerhtml: "Using 'dangerouslySetInnerHTML' may have security implications.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("dangerouslySetInnerHTML")) return {};
  return {
    JSXElement(node) {
      const attributes = node.openingElement.attributes;
      const attribute = JSX.getAttribute(
        "dangerouslySetInnerHTML",
        attributes,
        context.sourceCode.getScope(node),
      );
      if (attribute == null) return;
      context.report({
        messageId: "noDangerouslySetInnerhtml",
        node: attribute,
      });
    },
  };
}
