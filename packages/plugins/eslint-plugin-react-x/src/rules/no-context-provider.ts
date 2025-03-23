import { isComponentNameLoose } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-context-provider";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replace usages of `<Context.Provider>` with `<Context>`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noContextProvider: "In React 19, you can render '<Context>' as a provider instead of '<Context.Provider>'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
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
      if (contextSelfName == null) return;
      context.report({
        messageId: "noContextProvider",
        node,
        fix(fixer) {
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
}
