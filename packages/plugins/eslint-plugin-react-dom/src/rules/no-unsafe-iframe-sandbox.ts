import { getElementNameAndRepresentName } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeStringValue } from "../utils";
export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const unsafeCombinations = [
  ["allow-scripts", "allow-same-origin"],
] as const;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the 'sandbox' attribute internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unsafe iframe 'sandbox' attribute combinations",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeIframeSandbox: "Unsafe 'sandbox' attribute value on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getSettingsFromContext(context);
    const additionalComponents = settings.additionalComponents.filter((c) => c.as === "iframe");
    return {
      JSXElement(node) {
        const [name, representName] = getElementNameAndRepresentName(
          node.openingElement,
          context,
          settings.polymorphicPropName,
          settings.additionalComponents,
        );
        if (representName !== "iframe") return;

        const getPropValue = (propName: string) => {
          return getAttributeStringValue(
            propName,
            node,
            context,
            getAdditionalAttributes(name, additionalComponents),
          );
        };
        const sandboxValue = getPropValue("sandbox");
        if (sandboxValue === _) return;
        const values = sandboxValue.split(" ");
        if (unsafeCombinations.some((unsafes) => unsafes.every((x) => values.includes(x)))) {
          context.report({
            messageId: "noUnsafeIframeSandbox",
            node: node.openingElement,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
