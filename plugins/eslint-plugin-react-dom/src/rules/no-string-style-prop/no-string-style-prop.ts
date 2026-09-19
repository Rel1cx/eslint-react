import { createRule } from "@/utils/create-rule";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node) {
      // This rule only applies to host elements (ex: <div />, <span />), not custom components
      if (!isHostElement(node)) {
        return;
      }

      // Find the 'style' prop on the element
      const styleProp = findAttribute(context._, node, "style");
      if (styleProp == null) {
        return;
      }

      // Resolve the static value of the 'style' prop
      const styleValue = resolveAttributeValue(context._, styleProp);
      const staticValue = styleValue.toStatic();

      // If the resolved value is a string, report an error
      // e.g., <div style="color: red;" />
      if (typeof staticValue === "string") {
        context.report({
          messageId: "default",
          node: styleValue.node ?? styleProp,
        });
      }
    },
  };
}
