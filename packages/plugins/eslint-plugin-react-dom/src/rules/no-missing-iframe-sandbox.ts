import { getElementNameAndRepresentName } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeStringValue } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the 'sandbox' attribute internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that 'iframe' component have an explicit 'sandbox' attribute",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
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
        if (sandboxValue == null) {
          context.report({
            messageId: "noMissingIframeSandbox",
            node: node.openingElement,
          });
          return;
        }

        const values = sandboxValue.split(" ");
        if (!values.every((value) => validTypes.some((validType) => validType === value))) {
          context.report({
            messageId: "noMissingIframeSandbox",
            node: node.openingElement,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
