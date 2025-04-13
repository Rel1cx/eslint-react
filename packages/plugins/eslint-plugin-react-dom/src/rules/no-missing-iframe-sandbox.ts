import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createJsxElementResolver, createRule, findCustomComponentProp } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const validTypes = [
  "",
  "allow-downloads",
  "allow-downloads-without-user-activation",
  "allow-forms",
  "allow-modals",
  "allow-orientation-lock",
  "allow-pointer-lock",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-presentation",
  "allow-same-origin",
  "allow-scripts",
  "allow-storage-access-by-user-activation",
  "allow-top-navigation",
  "allow-top-navigation-by-user-activation",
  "allow-top-navigation-to-custom-protocols",
] as const;

function hasValidSandBox(value: unknown) {
  return typeof value === "string"
    && value
      .split(" ")
      .every((value) => validTypes.some((valid) => valid === value));
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces explicit `sandbox` attribute for `iframe` elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
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
      const { attributes, domElementType } = resolver.resolve(node);
      if (domElementType !== "iframe") return;
      const customComponentProp = findCustomComponentProp("sandbox", attributes);
      const propNameOnJsx = customComponentProp?.name ?? "sandbox";
      const attributeNode = ER.getAttribute(
        context,
        propNameOnJsx,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );
      if (attributeNode != null) {
        const attributeValue = ER.getAttributeValue(
          context,
          attributeNode,
          propNameOnJsx,
        );
        if (attributeValue.kind === "some" && hasValidSandBox(attributeValue.value)) return;
        context.report({
          messageId: "noMissingIframeSandbox",
          node: attributeNode,
        });
        return;
      }
      if (!hasValidSandBox(customComponentProp?.defaultValue)) {
        context.report({
          messageId: "noMissingIframeSandbox",
          node,
        });
      }
    },
  };
}
