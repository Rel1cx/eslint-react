import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
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
      noContextProvider:
        "In React 19, you can render '<{{contextName}}>' as a provider instead of '<{{contextName}}.Provider>'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes(".Provider")) return {};
    const { version } = getSettingsFromContext(context);
    if (compare(version, "19.0.0", "<")) {
      return {};
    }
    return {
      JSXElement(node) {
        const [name, ...rest] = JSX.getElementName(node).split(".").reverse();
        if (name !== "Provider") return;
        const contextName = rest.reverse().join(".");
        context.report({
          messageId: "noContextProvider",
          node,
          data: {
            contextName,
          },
          fix(fixer) {
            const openingElement = node.openingElement;
            const closingElement = node.closingElement;
            if (closingElement == null) {
              return fixer.replaceText(openingElement.name, contextName);
            }
            return [
              fixer.replaceText(openingElement.name, contextName),
              fixer.replaceText(closingElement.name, contextName),
            ];
          },
        });
      },
    };
  },
  defaultOptions: [],
});
