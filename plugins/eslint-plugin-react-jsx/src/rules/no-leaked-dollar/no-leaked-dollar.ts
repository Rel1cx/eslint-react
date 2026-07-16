import { createRule } from "@/utils/create-rule";
import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isEmptyStringExpression, isWhitespaceText } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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
  if (!context.sourceCode.text.includes("$")) return {};
  function visit(node: TSESTreeJSXElementLike) {
    for (const [index, child] of node.children.entries()) {
      if (child.type !== AST.JSXText || !child.value.endsWith("$")) continue;
      // Ensure the next sibling is a JSXExpressionContainer
      if (node.children[index + 1]?.type !== AST.JSXExpressionContainer) continue;
      // Skip an isolated '$' before a single expression when all other siblings
      // are non-substantive — intentional rendering (ex: `<div>${price}</div>`),
      // not a template literal split across JSX children.
      if (
        child.value.trim() === "$"
        && node.children.every((sibling, siblingIndex) => siblingIndex === index || siblingIndex === index + 1 || isNonSubstantiveChild(sibling))
      ) continue;
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

/**
 * Whether a JSX child carries no renderable content: padding whitespace, an
 * empty expression (ex: `{}` or a comment), or an empty string expression.
 * @param child The JSX child node to check.
 */
function isNonSubstantiveChild(child: TSESTree.JSXChild): boolean {
  if (isWhitespaceText(child) || isEmptyStringExpression(child)) return true;
  return child.type === AST.JSXExpressionContainer && child.expression.type === AST.JSXEmptyExpression;
}
