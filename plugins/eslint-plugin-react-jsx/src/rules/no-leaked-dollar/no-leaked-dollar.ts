import { createRule } from "@/utils/create-rule";
import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener, getText } from "@eslint-react/eslint";
import { isEmptyExpressionContainer, isEmptyStringExpression, isWhitespaceText } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-leaked-dollar";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "suggest";

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
      suggest: "Remove the text node '$'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if '$' is not present in the file
  if (!context.sourceCode.text.includes("$")) {
    return {};
  }

  return {
    // Visitor for JSX elements
    JSXElement(node) {
      visitForLeakedDollar(context, node);
    },
    // Visitor for JSX fragments
    JSXFragment(node) {
      visitForLeakedDollar(context, node);
    },
  };
}

/**
 * Report leaked `$` characters in a JSX element or fragment.
 * @param context The rule context.
 * @param node The JSX element or fragment to inspect.
 */
function visitForLeakedDollar(context: RuleContext<MessageID, []>, node: TSESTreeJSXElementLike) {
  for (const [index, child] of node.children.entries()) {
    if (child.type !== AST.JSXText || !child.value.endsWith("$")) continue;
    // Ensure the next sibling is a JSXExpressionContainer
    if (node.children[index + 1]?.type !== AST.JSXExpressionContainer) continue;
    // Skip an isolated '$' before a single expression when all other siblings
    // are non-substantive — intentional rendering (ex: `<div>${price}</div>`),
    // not a template literal split across JSX children.
    if (isIsolatedDollar(node, index, child)) continue;
    // Only report a literal '$' at the end of the raw text node.
    const rawText = getText(context, child);
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
          messageId: "suggest",
        },
      ],
    });
  }
}

/**
 * Check if a `$` text node is isolated before a single expression, with all
 * other siblings non-substantive.
 * @param node The parent JSX element or fragment.
 * @param index The index of the `$` text node.
 * @param child The `$` text node.
 * @returns `true` if the dollar should not be reported.
 */
function isIsolatedDollar(node: TSESTreeJSXElementLike, index: number, child: TSESTree.JSXText) {
  return child.value.trim() === "$"
    && node.children.every((sibling, siblingIndex) =>
      siblingIndex === index
      || siblingIndex === index + 1
      || isNonSubstantiveChild(sibling)
    );
}

/**
 * Whether a JSX child carries no renderable content: whitespace-only text, an
 * empty expression (ex: `{}` or a comment), or an empty string expression.
 * @param child The JSX child node to check.
 */
function isNonSubstantiveChild(child: TSESTree.JSXChild): boolean {
  return isWhitespaceText(child) || isEmptyExpressionContainer(child) || isEmptyStringExpression(child);
}
