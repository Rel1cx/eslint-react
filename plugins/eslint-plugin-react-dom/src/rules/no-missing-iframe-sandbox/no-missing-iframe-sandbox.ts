import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, resolveAttributeValue } from "@eslint-react/jsx";
import { isString } from "@local/eff";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "add-sandbox-attribute"
  | "missing-sandbox-attribute";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'sandbox' attribute for 'iframe' elements.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      "add-sandbox-attribute": "Add sandbox attribute with value '{{ value }}'.",
      "missing-sandbox-attribute": "Missing an explicit sandbox attribute for iframe.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      // If the element is not an iframe, we don't need to do anything
      if (domElementType !== "iframe") return;

      // Find the 'sandbox' prop on the iframe element.
      const sandboxProp = findAttribute(context, node, "sandbox");

      // If the 'sandbox' prop is missing, report an error
      if (sandboxProp == null) {
        context.report({
          messageId: "missing-sandbox-attribute",
          node: node.openingElement,
          suggest: [{
            data: { value: "" },
            fix(fixer) {
              // Suggest adding a 'sandbox' attribute
              return fixer.insertTextAfter(node.openingElement.name, ` sandbox=""`);
            },
            messageId: "add-sandbox-attribute",
          }],
        });
        return;
      }

      // Resolve the value of the 'sandbox' attribute; for spread attributes
      // the named property is extracted automatically
      const sandboxValue = resolveAttributeValue(context, sandboxProp, "sandbox");
      // If the value is a static string, the prop is correctly used
      if (isString(sandboxValue.toStatic())) return;

      // If the value is not a static string (ex: a variable), report an error
      context.report({
        messageId: "missing-sandbox-attribute",
        node: sandboxValue.node ?? sandboxProp,
        suggest: [
          {
            data: { value: "" },
            fix(fixer) {
              // Do not try to fix spread attributes
              if (sandboxValue.kind === "spreadProps") return null;
              // Suggest replacing the prop with a valid one
              return fixer.replaceText(sandboxProp, `sandbox=""`);
            },
            messageId: "add-sandbox-attribute",
          },
        ],
      });
    },
  };
}
