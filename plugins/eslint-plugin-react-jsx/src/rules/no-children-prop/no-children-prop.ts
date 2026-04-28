import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { findAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getChildrenPropText, getPropRemovalRange } from "./lib";

import { createRule } from "../../utils/create-rule";

export const RULE_NAME = "no-children-prop";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID = "moveChildrenToContent";

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
      moveChildrenToContent: "Move 'children' to element content.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return merge({
    JSXElement(node) {
      const childrenProp = findAttribute(context, node, "children");
      if (childrenProp == null) return;

      // Only handle direct JSXAttribute nodes (not spread props)
      if (childrenProp.type !== AST.JSXAttribute) {
        context.report({ messageId: "default", node: childrenProp });
        return;
      }

      const childrenText = getChildrenPropText(context, childrenProp);

      // Cannot extract a meaningful children value – report without suggestion
      if (childrenText == null) {
        context.report({ messageId: "default", node: childrenProp });
        return;
      }

      context.report({
        messageId: "default",
        node: childrenProp,
        suggest: [
          {
            fix(fixer) {
              const sourceCode = context.sourceCode;
              const { openingElement } = node;
              const [removeStart, removeEnd] = getPropRemovalRange(context, childrenProp);

              if (openingElement.selfClosing) {
                const tagName = sourceCode.getText(openingElement.name);

                // Locate the self-closing marker `/>` inside the opening element
                const elementText = sourceCode.getText(openingElement);
                const selfCloseOffset = elementText.lastIndexOf("/>");
                const selfCloseStart = openingElement.range[0] + selfCloseOffset;

                // Also consume any whitespace that sits between the last
                // remaining token and the `/>` marker so we don't leave a
                // trailing space before `>`.
                let wsStart = selfCloseStart;
                while (wsStart > removeEnd && /\s/.test(sourceCode.text[wsStart - 1]!)) {
                  wsStart--;
                }

                return [
                  fixer.removeRange([removeStart, removeEnd]),
                  fixer.replaceTextRange(
                    [wsStart, openingElement.range[1]],
                    `>${childrenText}</${tagName}>`,
                  ),
                ];
              }

              // Non-self-closing: remove prop and append children before the
              // closing tag (after any existing children content).
              const fixes: ReturnType<typeof fixer.remove>[] = [
                fixer.removeRange([removeStart, removeEnd]),
              ];

              if (node.closingElement != null) {
                fixes.push(
                  fixer.insertTextBefore(node.closingElement, childrenText),
                );
              }

              return fixes;
            },
            messageId: "moveChildrenToContent",
          },
        ],
      });
    },
  });
}
