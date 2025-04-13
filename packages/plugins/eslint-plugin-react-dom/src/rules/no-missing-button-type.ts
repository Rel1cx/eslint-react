import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as JSX from "@eslint-react/jsx";

import { createJsxElementResolver, createRule, findCustomComponentProp } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces explicit `type` attribute for `button` elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingButtonType: "Add missing 'type' attribute on 'button' component.",
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
      if (domElementType !== "button") return;
      const elementScope = context.sourceCode.getScope(node);
      const customComponentProp = findCustomComponentProp("type", attributes);
      const propNameOnJsx = customComponentProp?.name ?? "type";
      const attributeNode = JSX.getAttribute(
        propNameOnJsx,
        node.openingElement.attributes,
        elementScope,
      );
      if (attributeNode != null) {
        const attributeScope = context.sourceCode.getScope(attributeNode);
        const attributeValue = JSX.getAttributeValue(attributeNode, propNameOnJsx, attributeScope);
        if (attributeValue.kind === "some" && typeof attributeValue.value !== "string") {
          context.report({
            messageId: "noMissingButtonType",
            node: attributeNode,
          });
        }
        return;
      }
      if (typeof customComponentProp?.defaultValue !== "string") {
        context.report({
          messageId: "noMissingButtonType",
          node,
        });
      }
    },
  };
}
