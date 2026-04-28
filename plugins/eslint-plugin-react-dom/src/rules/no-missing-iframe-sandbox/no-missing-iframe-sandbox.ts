import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { findAttribute, resolveAttributeValue } from "@eslint-react/jsx";

import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "addSandboxAttribute"
  | "missingSandboxAttribute";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'sandbox' attribute for 'iframe' elements.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      addSandboxAttribute: "Add sandbox attribute with value '{{ value }}'.",
      missingSandboxAttribute: "Missing an explicit sandbox attribute for iframe.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const resolver = createJsxElementResolver(context);

  return merge(
    {
      JSXElement(node) {
        const { domElementType } = resolver.resolve(node);
        // If the element is not an iframe, we don't need to do anything
        if (domElementType !== "iframe") return;

        // Find the 'sandbox' prop on the iframe element.
        const sandboxProp = findAttribute(context, node, "sandbox");

        // If the 'sandbox' prop is missing, report an error
        if (sandboxProp == null) {
          context.report({
            messageId: "missingSandboxAttribute",
            node: node.openingElement,
            suggest: [{
              data: { value: "" },
              fix(fixer) {
                // Suggest adding a 'sandbox' attribute
                return fixer.insertTextAfter(node.openingElement.name, ` sandbox=""`);
              },
              messageId: "addSandboxAttribute",
            }],
          });
          return;
        }

        // Resolve the value of the 'sandbox' attribute
        const sandboxValue = resolveAttributeValue(context, sandboxProp);
        // If the value is a static string, the prop is correctly used
        if (typeof sandboxValue.toStatic() === "string") return;
        // If the value is a spread attribute that includes a 'sandbox' property, we can assume it's correctly used
        if (sandboxValue.kind === "spreadProps" && typeof sandboxValue.getProperty("sandbox") === "string") return;

        // If the value is not a static string (ex: a variable), report an error
        context.report({
          messageId: "missingSandboxAttribute",
          node: sandboxValue.node ?? sandboxProp,
          suggest: [
            {
              data: { value: "" },
              fix(fixer) {
                // Do not try to fix spread attributes
                if (sandboxValue.kind.startsWith("spread")) return null;
                // Suggest replacing the prop with a valid one
                return fixer.replaceText(sandboxProp, `sandbox=""`);
              },
              messageId: "addSandboxAttribute",
            },
          ],
        });
      },
    },
  );
}
