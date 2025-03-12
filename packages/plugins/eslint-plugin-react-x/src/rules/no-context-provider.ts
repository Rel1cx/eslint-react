import { isComponentNameLoose } from "@eslint-react/core";
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
      description: "replace usages of '<Context.Provider>' with '<Context>'",
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
    if (!context.sourceCode.text.includes("Provider")) return {};
    const { version } = getSettingsFromContext(context);
    if (compare(version, "19.0.0", "<")) return {};
    return {
      JSXElement(node) {
        const fullName = JSX.getElementType(node);
        const parts = fullName.split(".");
        const selfName = parts.pop();
        const contextFullName = parts.join(".");
        const contextSelfName = parts.pop();
        if (selfName !== "Provider") return;
        context.report({
          messageId: "noContextProvider",
          node,
          fix(fixer) {
            if (contextSelfName == null) return null;
            if (!isComponentNameLoose(contextSelfName)) return null;
            const openingElement = node.openingElement;
            const closingElement = node.closingElement;
            if (closingElement == null) {
              return fixer.replaceText(openingElement.name, contextFullName);
            }
            return [
              fixer.replaceText(openingElement.name, contextFullName),
              fixer.replaceText(closingElement.name, contextFullName),
            ];
          },
        });
      },
    };
  },
  defaultOptions: [],
});
