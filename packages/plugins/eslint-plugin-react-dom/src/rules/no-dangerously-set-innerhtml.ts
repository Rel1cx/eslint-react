import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const DSIH = "dangerouslySetInnerHTML";

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
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.sourceCode.text.includes(DSIH)) return {};
  return {
    JSXElement(node) {
      const findJsxAttribute = getJsxAttribute(
        context,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );
      const attr = findJsxAttribute(DSIH);
      if (attr == null) return;
      context.report({
        messageId: "noDangerouslySetInnerhtml",
        node: attr,
      });
    },
  };
}
