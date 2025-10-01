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
      noDangerouslySetInnerhtmlWithChildren: "A DOM component cannot use both children and 'dangerouslySetInnerHTML'.",
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
function isSignificantChildren(node: TSESTree.JSXElement["children"][number]) {
  if (!isJsxText(node)) {
    return true;
  }
  // A JSXText node is insignificant if it's purely whitespace and contains a newline,
  // which is a common pattern for formatting.
  const isFormattingWhitespace = node.raw.trim() === "" && node.raw.includes("\n");

  return !isFormattingWhitespace;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.sourceCode.text.includes(DSIH)) {
    return {};
  }

  return {
    JSXElement(node) {
      const findJsxAttribute = getJsxAttribute(context, node);
      if (findJsxAttribute(DSIH) == null) return;
      const childrenPropOrNode = findJsxAttribute("children") ?? node.children.find(isSignificantChildren);
      if (childrenPropOrNode == null) return;
      context.report({
        messageId: "noDangerouslySetInnerhtmlWithChildren",
        node: childrenPropOrNode,
      });
    },
  };
}
