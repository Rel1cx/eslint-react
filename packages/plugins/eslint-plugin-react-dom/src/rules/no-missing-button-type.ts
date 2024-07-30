import { findPropInAttributes, getElementType } from "@eslint-react/jsx";
import { decodeSettings } from "@eslint-react/shared";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button component have an explicit 'type' attribute",
    },
    messages: {
      NO_MISSING_BUTTON_TYPE: "Add missing 'type' attribute on 'button' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { polymorphicPropName } = decodeSettings(context.settings);
    return {
      JSXElement(node) {
        const elementType = getElementType(context, polymorphicPropName)(node.openingElement);
        if (elementType !== "button") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeTypeAttribute = findPropInAttributes(attributes, context, initialScope)("type");
        if (O.isSome(maybeTypeAttribute)) return;
        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node: node.openingElement,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
