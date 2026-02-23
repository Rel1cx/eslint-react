import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../../utils";

export const RULE_NAME = "no-use-context";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default" | "replace";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Replaces usage of 'useContext' with 'use'.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "In React 19, 'use' is preferred over 'useContext' because it is more flexible.",
      replace: "Replace 'useContext' with 'use'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `useContext` is not present in the file
  if (!context.sourceCode.text.includes("useContext")) return {};
  const { version } = getSettingsFromContext(context);
  // Skip if React version is less than 19.0.0
  if (compare(version, "19.0.0", "<")) {
    return {};
  }
  return defineRuleListener(
    {
      CallExpression(node) {
        if (!core.isUseContextCall(node)) return;
        context.report({
          messageId: "default",
          node: node.callee,
          suggest: [
            {
              messageId: "replace",
              fix(fixer) {
                switch (node.callee.type) {
                  case AST.Identifier:
                    return fixer.replaceText(node.callee, "use");
                  case AST.MemberExpression:
                    return fixer.replaceText(node.callee.property, "use");
                }
                return null;
              },
            },
          ],
        });
      },
    },
  );
}
