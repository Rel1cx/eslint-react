import * as JSX from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-context-provider";

export const RULE_FEATURES = [
  "CHK",
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of '<Context.Provider>'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noContextProvider: "In React 19, you can render '<Context>' as a provider instead of '<Context.Provider>'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes(".Provider")) return {};
    const { version } = getSettingsFromContext(context);
    if (compare(version, "19.0.0", "<")) return {};
    return {
      JSXElement(node) {
        const elementName = JSX.getElementName(node.openingElement);
        if (!elementName.endsWith(".Provider")) return;
        context.report({
          messageId: "noContextProvider",
          node,
          fix(fixer) {
            const providerName = elementName.replace(/\.Provider$/, "");
            const openingElement = node.openingElement;
            const closingElement = node.closingElement;
            if (!closingElement) return fixer.replaceText(openingElement.name, providerName);
            return [
              fixer.replaceText(openingElement.name, providerName),
              fixer.replaceText(closingElement.name, providerName),
            ];
          },
        });
      },
    };
  },
  defaultOptions: [],
});
