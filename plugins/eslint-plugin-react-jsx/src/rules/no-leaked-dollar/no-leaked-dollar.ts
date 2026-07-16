import { createRule } from "@/utils/create-rule";
import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-leaked-dollar";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "removeDollarSign";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description:
        'Catches `$` before `{expr}` in JSX — typically from template literal `${expr}` being copy-pasted into JSX without removing the `$`. The `$` "leaks" into the rendered output.',
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Leaked '$' in JSX. This '$' will be rendered as text nodes.",
      removeDollarSign: "Remove the text node '$'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  /**
   * Visitor function for JSXElement and JSXFragment nodes
   * @param node The JSXElement or JSXFragment node to be checked
   */
  function visit(node: TSESTreeJSXElementLike) {
    for (const [index, child] of node.children.entries()) {
      if (child.type !== AST.JSXText || !child.value.endsWith("$")) continue;
      // Ensure the next sibling is a JSXExpressionContainer
      if (node.children[index + 1]?.type !== AST.JSXExpressionContainer) continue;
      // Skip if there are only two children (the dollar sign and the expression) it doesn't seem to be split from a template literal
      if (child.value === "$" && node.children.length === 2) continue;
      // Only report a literal '$' at the end of the raw text node.
      const rawText = context.sourceCode.getText(child);
      if (!rawText.endsWith("$")) continue;

      const dollarStart = child.range[1] - 1;
      const dollarEnd = child.range[1];
      context.report({
        loc: {
          end: context.sourceCode.getLocFromIndex(dollarEnd),
          start: context.sourceCode.getLocFromIndex(dollarStart),
        },
        messageId: "default",
        node: child,
        suggest: [
          {
            fix(fixer) {
              return fixer.removeRange([dollarStart, dollarEnd]);
            },
            messageId: "removeDollarSign",
          },
        ],
      });
    }
  }
  return { JSXElement: visit, JSXFragment: visit };
}
