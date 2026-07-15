import { isDirectJsxChild } from "@/utils/common";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

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
  return /^;[ \t]*(?:\r\n|\r|\n)/u.test(text);
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function visit(node: TSESTree.JSXText | TSESTree.Literal) {
    if (!isDirectJsxChild(node)) return;

    const text = context.sourceCode.getText(node);
    if (!hasLeakedSemicolon(text)) return;

    const semicolonStart = node.range[0];
    const semicolonEnd = node.range[0] + 1;
    context.report({
      messageId: "default",
      node,
      suggest: [
        {
          fix(fixer) {
            return fixer.removeRange([semicolonStart, semicolonEnd]);
          },
          messageId: "removeSemicolon",
        },
      ],
    });
  }
  return {
    JSXText: visit,
    Literal: visit,
  };
}
