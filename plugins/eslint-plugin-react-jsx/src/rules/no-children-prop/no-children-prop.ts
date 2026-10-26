import { createRule } from "@/utils/create-rule";
import { removeJSXAttribute } from "@/utils/remove-jsx-attribute";
import { Check } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener, getText } from "@eslint-react/eslint";
import { findAttribute, findCreateElementProp, hasMeaningfulChildren, parseCreateElementCall } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export const RULE_NAME = "no-children-prop";

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
      description: "Disallows passing 'children' as a prop.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Do not pass 'children' as props.",
      suggest: "Move 'children' to element content.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      const call = parseCreateElementCall(context, node);
      if (call == null) return;
      const prop = findCreateElementProp(context, call, "children");
      if (prop == null) return;

      // `createElement(type, props, ...children)` already has conflicting
      // children content; that case belongs to 'no-children-prop-with-children'
      if (call.childrenArguments.length > 0) return;

      context.report({
        messageId: "default",
        node: prop,
      });
    },
    JSXElement(node) {
      const match = findAttribute(context, node, "children");
      if (match == null) return;

      // Nested children content already conflicts with the prop; that case
      // belongs to 'no-children-prop-with-children'
      if (hasMeaningfulChildren(node)) return;

      // Spread attributes cannot be converted to element content safely,
      // so report without a suggestion
      if (match.kind !== "plain") {
        context.report({ messageId: "default", node: match.attribute });
        return;
      }
      const prop = match.attribute;

      // Turn the 'children' prop value into text usable as element content
      const childrenText = getChildrenText(context, prop);

      // Cannot extract a meaningful children value – report without suggestion
      if (childrenText == null) {
        context.report({ messageId: "default", node: prop });
        return;
      }

      context.report({
        messageId: "default",
        node: prop,
        suggest: [
          {
            fix: buildFix(context, node, prop, childrenText),
            messageId: "suggest",
          },
        ],
      });
    },
  };
}

/**
 * Turns the value of a 'children' JSXAttribute into text usable as element content
 * @param context The rule context
 * @param attribute The 'children' JSXAttribute node
 * @returns The text to insert as element content, or `null` when no usable value exists
 */
function getChildrenText(context: RuleContext, attribute: TSESTree.JSXAttribute): string | null {
  const { value } = attribute;
  if (value?.type === AST.Literal) {
    return escapeJSXText(String(value.value));
  }
  if (value?.type === AST.JSXExpressionContainer && value.expression.type !== AST.JSXEmptyExpression) {
    const exprText = getText(context, value.expression);
    return Check.isJSXElementOrFragment(value.expression) ? exprText : `{${exprText}}`;
  }
  return null;
}

/**
 * Escapes characters that would be parsed as markup in JSX text
 * @param text The raw string value
 * @returns The escaped text safe for insertion as JSX content
 */
function escapeJSXText(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

/**
 * Builds the fix that moves the 'children' prop value into the element's content
 * @param context The rule context object
 * @param node The JSXElement node being reported
 * @param prop The 'children' JSXAttribute to remove
 * @param childrenText The text to insert as element content
 * @returns A fixer function that applies the changes
 */
function buildFix(context: RuleContext, node: TSESTree.JSXElement, prop: TSESTree.JSXAttribute, childrenText: string): (fixer: RuleFixer) => RuleFix[] {
  return (fixer) => {
    const { openingElement } = node;
    const removePropFix = removeJSXAttribute(context, fixer, prop);

    if (openingElement.selfClosing) {
      const tagName = getText(context, openingElement.name);

      // Locate the self-closing marker `/>` inside the opening element
      const elementText = getText(context, openingElement);
      const selfCloseOffset = elementText.lastIndexOf("/>");
      const selfCloseStart = openingElement.range[0] + selfCloseOffset;

      // Also consume any whitespace that sits between the last
      // remaining token and the `/>` marker so we don't leave a
      // trailing space before `>`.
      let wsStart = selfCloseStart;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      while (wsStart > prop.range[1] && /\s/.test(context.sourceCode.text[wsStart - 1]!)) {
        wsStart--;
      }

      return [
        removePropFix,
        fixer.replaceTextRange([wsStart, openingElement.range[1]], `>${childrenText}</${tagName}>`),
      ];
    }

    // Non-self-closing: remove prop and append children before the
    // closing tag (after any remaining children content).
    if (node.closingElement == null) return [removePropFix];
    return [
      removePropFix,
      fixer.insertTextBefore(node.closingElement, childrenText),
    ];
  };
}
