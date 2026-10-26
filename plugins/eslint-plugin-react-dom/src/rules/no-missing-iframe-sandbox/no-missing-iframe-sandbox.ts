import { createJSXElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { getAttributeReportNode } from "@/utils/get-attribute-report-node";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeValue, resolveAttributeStaticValue } from "@eslint-react/jsx";
import { isString } from "@local/eff";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "suggest";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'sandbox' attribute for 'iframe' elements.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Missing an explicit sandbox attribute for iframe.",
      suggest: "Add sandbox attribute with value '{{ value }}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJSXElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      // If the element is not an iframe, we don't need to do anything
      if (domElementType !== "iframe") return;

      // Find and resolve the 'sandbox' prop on the iframe element.
      const sandboxValue = getAttributeValue(context, node, "sandbox");

      // If the 'sandbox' prop is missing, report an error
      if (sandboxValue == null) {
        context.report({
          messageId: "default",
          node: node.openingElement,
          suggest: [{
            data: { value: "" },
            fix(fixer) {
              // Suggest adding a 'sandbox' attribute
              return fixer.insertTextAfter(node.openingElement.name, ` sandbox=""`);
            },
            messageId: "suggest",
          }],
        });
        return;
      }

      // If the value is a static string, the prop is correctly used
      if (isString(resolveAttributeStaticValue(context, sandboxValue))) return;

      const reportNode = getAttributeReportNode(sandboxValue);

      // If the value is not a static string (ex: a variable), report an error
      context.report({
        messageId: "default",
        node: reportNode,
        // Replacing a spread attribute would drop its other properties
        suggest: sandboxValue.kind === "spreadProps"
          ? []
          : [
            {
              data: { value: "" },
              fix(fixer) {
                // Suggest replacing the prop with a valid one
                return fixer.replaceText(sandboxValue.attribute, `sandbox=""`);
              },
              messageId: "suggest",
            },
          ],
      });
    },
  };
}
