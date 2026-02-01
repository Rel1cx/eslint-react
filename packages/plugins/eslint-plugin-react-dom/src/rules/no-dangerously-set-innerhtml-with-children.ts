import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows DOM elements from using 'dangerouslySetInnerHTML' and 'children' at the same time.",
    },
    messages: {
      default: "A DOM component cannot use both children and 'dangerouslySetInnerHTML'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const DSIH = "dangerouslySetInnerHTML";

/**
 * Check if a JSX child node is considered significant (i.e., not just whitespace for formatting)
 * @param node The JSX child node to check
 * @returns `true` if the node is significant, `false` otherwise
 */
function isSignificantChildren(node: TSESTree.JSXElement["children"][number]) {
  // Any node that is not plain text is considered significant
  if (!core.isJsxText(node)) {
    return true;
  }
  // A JSXText node is insignificant if it's purely whitespace and contains a newline,
  // which is a common pattern for formatting.
  const isFormattingWhitespace = node.raw.trim() === "" && node.raw.includes("\n");

  // The node is significant if it's not just formatting whitespace
  return !isFormattingWhitespace;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: if the file doesn't contain `dangerouslySetInnerHTML`, we don't need to do anything
  if (!context.sourceCode.text.includes(DSIH)) {
    return {};
  }

  return {
    JSXElement(node) {
      const findJsxAttribute = core.getJsxAttribute(context, node);
      // Check if the element has the 'dangerouslySetInnerHTML' prop. If not, we can stop
      if (findJsxAttribute(DSIH) == null) return;
      // Check for a 'children' prop or actual child nodes that are not just whitespace
      const childrenPropOrNode = findJsxAttribute("children") ?? node.children.find(isSignificantChildren);
      // If no children are found, the rule passes
      if (childrenPropOrNode == null) return;
      // If both 'dangerouslySetInnerHTML' and children are present, report an error
      context.report({
        messageId: "default",
        node: childrenPropOrNode,
      });
    },
  };
}
