import { getElementRepresentName } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export type MessageID = CamelCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button component have an explicit 'type' attribute",
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
        const maybeTypeAttribute = JSX.findPropInAttributes(attributes, initialScope)("type");
        if (O.isSome(maybeTypeAttribute)) return;
        context.report({
          messageId: "noMissingButtonType",
          node: node.openingElement,
        });
      },
    };
  },
  defaultOptions: [],
});
