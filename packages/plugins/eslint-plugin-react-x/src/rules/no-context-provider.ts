import { getJsxElementType, isComponentNameLoose } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
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
      description: "Replaces usage of '<Context.Provider>' with '<Context>'.",
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
  // Fast path: skip if `Provider` is not present in the file
  if (!context.sourceCode.text.includes("Provider")) return {};
  const { version } = getSettingsFromContext(context);
  // This rule only applies to React 19 and later
  if (compare(version, "19.0.0", "<")) return {};
  return {
    JSXElement(node) {
      // Get the full name of the JSX element: "Foo.MyContext.Provider"
      const fullName = getJsxElementType(context, node);
      const parts = fullName.split(".");
      const selfName = parts.pop();
      const contextFullName = parts.join(".");
      const contextSelfName = parts.pop();
      // Exit if the element is not a "Provider"
      if (selfName !== "Provider") return;
      // Exit if there is no context name or it doesn't end with "Context"
      if (contextSelfName == null || !contextSelfName.endsWith("Context")) return;
      context.report({
        messageId: "noContextProvider",
        node,
        fix(fixer) {
          // Ensure the context name is a valid component name before applying the fix
          if (!isComponentNameLoose(contextSelfName)) return null;
          const openingElement = node.openingElement;
          const closingElement = node.closingElement;
          // Handle self-closing elements like <MyContext.Provider value={...} />
          if (closingElement == null) {
            return fixer.replaceText(openingElement.name, contextFullName);
          }
          // Handle elements with children like <MyContext.Provider value={...}>...</MyContext.Provider>
          return [
            fixer.replaceText(openingElement.name, contextFullName),
            fixer.replaceText(closingElement.name, contextFullName),
          ];
        },
      });
    },
  };
}
