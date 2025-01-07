import { getElementRepresentName } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

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
    return {
      JSXElement(node) {
        const elementName = getElementRepresentName(node.openingElement, context);
        if (elementName !== "button") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const mbProp = JSX.findPropInAttributes(attributes, initialScope)("type");
        if (O.isSome(mbProp)) return;
        context.report({
          messageId: "noMissingButtonType",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
