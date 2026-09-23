import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeDescriptor, isHostElement } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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

      const styleDescriptor = getAttributeDescriptor(context, node, "style");
      if (styleDescriptor == null) return;
      if (typeof styleDescriptor.getStaticValue()?.value !== "string") return;

      const styleProp = styleDescriptor.source.node;

      context.report({
        messageId: "default",
        node: styleProp.type === AST.JSXSpreadAttribute ? styleProp.argument : styleDescriptor.value.node ?? styleProp,
      });
    },
  };
}
