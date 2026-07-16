import { createRule } from "@/utils/create-rule";
import { Check } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-leaked-semicolon";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "removeSemicolon";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        'Catches `;` at the start of JSX text nodes — typically from accidentally placing a statement-ending `;` inside JSX. The `;` "leaks" into the rendered output.',
    },
    fixable: "code",
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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function visit(node: TSESTree.JSXText | TSESTree.Literal) {
    if (!Check.isJSXElementOrFragment(node.parent)) return;

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

/**
 * Checks whether the raw text of a JSX text node starts with a `;` immediately followed by a line break
 * @param text The raw text of the JSX text node or literal to check
 * @returns True if the text looks like a leaked semicolon
 */
function hasLeakedSemicolon(text: string) {
  return /^;[ \t]*(?:\r\n|\r|\n)/u.test(text);
}
