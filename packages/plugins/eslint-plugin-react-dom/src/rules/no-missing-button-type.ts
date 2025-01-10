import { getElementNameAndRepresentName } from "@eslint-react/core";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeStringValue } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button component have an explicit 'type' attribute",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingButtonType: "Add missing 'type' attribute on 'button' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getSettingsFromContext(context);
    const additionalComponents = settings.additionalComponents.filter((c) => c.as === "button");
    return {
      JSXElement(node) {
        const [name, representName] = getElementNameAndRepresentName(
          node.openingElement,
          context,
          settings.polymorphicPropName,
          settings.additionalComponents,
        );
        if (representName !== "button") return;
        const getPropValue = (propName: string) => {
          return getAttributeStringValue(
            propName,
            node,
            context,
            getAdditionalAttributes(name, additionalComponents),
          );
        };
        const prop = getPropValue("type");
        if (typeof prop !== "string") {
          context.report({
            messageId: "noMissingButtonType",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
