import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getElementFullType } from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import { compare } from "compare-versions";

export const RULE_NAME = "no-context-provider";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "suggest";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Replaces usage of '<Context.Provider>' with '<Context>'.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "In React 19, you can render '<Context>' as a provider instead of '<Context.Provider>'.",
      suggest: "Replace '<Context.Provider>' with '<Context>'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `Provider` is not present in the file
  if (!context.sourceCode.text.includes("Provider")) return {};
  const { version } = getSettingsFromContext(context);
  // This rule only applies to React 19 and later
  if (compare(version, "19.0.0", "<")) return {};
  return {
    JSXElement(node) {
      const fullName = getElementFullType(node);
      const parts = fullName.split(".");
      const selfName = parts.pop();
      const contextFullName = parts.join(".");
      const contextSelfName = parts.pop();
      if (selfName !== "Provider") return;
      if (contextSelfName == null || !contextSelfName.endsWith("Context")) return;
      context.report({
        messageId: "default",
        node,
        suggest: [
          {
            fix(fixer) {
              // Ensure the context name is a valid component name before applying the fix
              if (!core.isFunctionComponentNameLoose(contextSelfName)) return null;
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
            messageId: "suggest",
          },
        ],
      });
    },
  };
}
