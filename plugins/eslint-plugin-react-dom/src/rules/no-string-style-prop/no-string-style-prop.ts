import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, isHostElement, resolveAttributeValue } from "@eslint-react/jsx";

export const RULE_NAME = "no-string-style-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of string style prop in JSX. Use an object instead.",
    },
    messages: {
      default: "Do not use string style prop. Use an object instead.",
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
      // This rule only applies to host elements (ex: <div />, <span />), not custom components
      if (!isHostElement(node)) return;

      const styleProp = findAttribute(context, node, "style");
      if (styleProp == null) return;

      const styleValue = resolveAttributeValue(context, styleProp);
      if (typeof styleValue.toStatic() !== "string") return;

      context.report({
        messageId: "default",
        node: styleValue.node ?? styleProp,
      });
    },
  };
}
