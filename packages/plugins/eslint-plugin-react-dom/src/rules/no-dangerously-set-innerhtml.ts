import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
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
      description: "Disallows DOM elements from using 'dangerouslySetInnerHTML'.",
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
      // Check if the element has the 'dangerouslySetInnerHTML' prop
      const dsihProp = getJsxAttribute(context, node)(DSIH);
      // If the prop is not found, do nothing
      if (dsihProp == null) return;
      // If the prop is found, report an error
      context.report({
        messageId: "noDangerouslySetInnerhtml",
        node: dsihProp,
      });
    },
  };
}
