import { Check } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-leaked-semicolon";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID = "removeSemicolon";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        'Catches `;` at the start of JSX text nodes — typically from accidentally placing a statement-ending `;` inside JSX. The `;` "leaks" into the rendered output.',
    },
    hasSuggestions: true,
    messages: {
      default: "Leaked ';' in JSX. This ';' will be rendered as text nodes.",
      removeSemicolon: "Remove the text node ';'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function hasLeakedSemicolon(text: string) {
  return text.startsWith(";\n") || text.startsWith(";\r");
}

export function create(context: RuleContext<MessageID, []>) {
  const visitorFunction = (node: TSESTree.JSXText | TSESTree.Literal) => {
    if (!Check.isJSXElementOrFragment(node.parent)) {
      return;
    }
    if (!hasLeakedSemicolon(context.sourceCode.getText(node))) {
      return;
    }
    context.report({
      messageId: "default",
      node,
      suggest: [
        {
          fix(fixer) {
            return fixer.removeRange([node.range[0], node.range[0] + 1]);
          },
          messageId: "removeSemicolon",
        },
      ],
    });
  };
  return merge({
    JSXText: visitorFunction,
    Literal: visitorFunction,
  });
}
