import { getJsxAttribute, isJsxText } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `dangerouslySetInnerHTML` and `children` at the same time.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDangerouslySetInnerhtmlWithChildren:
        "A DOM component cannot use both 'children' and 'dangerouslySetInnerHTML'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const DSIH = "dangerouslySetInnerHTML";

/**
 * Checks if a JSX child node is considered significant (i.e., not just whitespace for formatting).
 * @param node The JSX child node to check.
 * @returns `true` if the node is significant, `false` otherwise.
 */
function isSignificantChildren(node: TSESTree.JSXElement["children"][number]): boolean {
  if (!isJsxText(node)) {
    return true;
  }
  // A JSXText node is insignificant if it's purely whitespace and contains a newline,
  // which is a common pattern for formatting.
  const isFormattingWhitespace = node.raw.trim() === "" && node.raw.includes("\n");

  return !isFormattingWhitespace;
}

/**
 * Checks if a JSX element has children, either through the `children` prop or as JSX children.
 * @param context The rule context.
 * @param node The JSX element to check.
 * @returns `true` if the element has children, `false` otherwise.
 */
function hasChildren(context: RuleContext, node: TSESTree.JSXElement): boolean {
  const findJsxAttribute = getJsxAttribute(
    context,
    node.openingElement.attributes,
    context.sourceCode.getScope(node),
  );

  if (findJsxAttribute("children") != null) {
    return true;
  }

  return node.children.some(isSignificantChildren);
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.sourceCode.text.includes(DSIH)) {
    return {};
  }

  return {
    JSXElement(node) {
      const findJsxAttribute = getJsxAttribute(
        context,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );

      const DSIHAttr = findJsxAttribute(DSIH);
      if (DSIHAttr == null) {
        return;
      }

      if (hasChildren(context, node)) {
        context.report({
          messageId: "noDangerouslySetInnerhtmlWithChildren",
          node: DSIHAttr,
        });
      }
    },
  };
}
