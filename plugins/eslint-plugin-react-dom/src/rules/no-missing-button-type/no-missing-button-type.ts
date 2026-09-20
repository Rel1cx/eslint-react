import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { hasAttribute } from "@eslint-react/jsx";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;

export type MessageID =
  | "addTypeAttribute"
  | "missingTypeAttribute";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'type' attribute for 'button' elements.",
    },
    hasSuggestions: true,
    messages: {
      addTypeAttribute: "Add type attribute with value '{{ type }}'.",
      missingTypeAttribute: "Missing an explicit type attribute for button.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "button") return;
      if (hasAttribute(context, node, "type")) return;
      context.report({
        messageId: "missingTypeAttribute",
        node: node.openingElement,
        suggest: BUTTON_TYPES.map((type) => ({
          data: { type },
          fix(fixer) {
            return fixer.insertTextAfter(node.openingElement.name, ` type="${type}"`);
          },
          messageId: "addTypeAttribute",
        } as const)),
      });
    },
  };
}
