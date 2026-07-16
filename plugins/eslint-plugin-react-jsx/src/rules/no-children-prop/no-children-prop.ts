import { findChildrenProperty, getChildrenPropText, getPropRemovalRange } from "@/utils/common";
import { createRule } from "@/utils/create-rule";
import { Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export const RULE_NAME = "no-children-prop";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "moveChildrenToContent";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      if (!core.isCreateElementCall(context, node)) return;

      const [, propsArg] = node.arguments;
      if (propsArg == null) return;

      const propsObject = Extract.unwrap(propsArg);
      if (propsObject.type !== AST.ObjectExpression) return;

      const childrenProp = findChildrenProperty(propsObject);
      if (childrenProp == null) return;

      context.report({
        messageId: "default",
        node: childrenProp,
      });
    },
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
            fix: buildFix(context, node, childrenProp, childrenText),
            messageId: "moveChildrenToContent",
          },
        ],
      });
    },
  };
}

/**
 * Builds the fix that moves the 'children' prop value into the element's content
 * @param context The rule context object
 * @param node The JSXElement node being reported
 * @param prop The 'children' JSXAttribute to remove
 * @param childrenText The text to insert as element content
 * @returns A fixer function that applies the changes
 */
function buildFix(
  context: RuleContext,
  node: TSESTree.JSXElement,
  prop: TSESTree.JSXAttribute,
  childrenText: string,
): (fixer: RuleFixer) => RuleFix[] {
  return (fixer) => {
    const sourceCode = context.sourceCode;
    const { openingElement } = node;
    const [removeStart, removeEnd] = getPropRemovalRange(context, prop);

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      while (wsStart > removeEnd && /\s/.test(sourceCode.text[wsStart - 1]!)) {
        wsStart--;
      }

      return [
        fixer.removeRange([removeStart, removeEnd]),
        fixer.replaceTextRange([wsStart, openingElement.range[1]], `>${childrenText}</${tagName}>`),
      ];
    }

    // Non-self-closing: remove prop and append children before the
    // closing tag (after any existing children content).
    const fixes: RuleFix[] = [
      fixer.removeRange([removeStart, removeEnd]),
    ];

    if (node.closingElement != null) {
      fixes.push(fixer.insertTextBefore(node.closingElement, childrenText));
    }

    return fixes;
  };
}
