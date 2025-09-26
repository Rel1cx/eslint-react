import { hasAttribute, isJsxText } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
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

const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes(dangerouslySetInnerHTML)) return {};
  return {
    JSXElement(node) {
      const attributes = node.openingElement.attributes;
      const initialScope = context.sourceCode.getScope(node);
      const hasChildren = node.children.some(isSignificantChildren)
        || hasAttribute(context, "children", attributes, initialScope);
      if (hasChildren && hasAttribute(context, dangerouslySetInnerHTML, attributes, initialScope)) {
        context.report({
          messageId: "noDangerouslySetInnerhtmlWithChildren",
          node,
        });
      }
    },
  };
}

/**
 * Check if a Literal or JSXText node is whitespace
 * @param node The AST node to check
 * @returns boolean `true` if the node is whitespace
 */
function isWhiteSpace(node: TSESTree.JSXText | TSESTree.Literal) {
  return typeof node.value === "string" && node.raw.trim() === "";
}

/**
 * Check if a Literal or JSXText node is padding spaces
 * @param node The AST node to check
 * @returns boolean
 */
function isPaddingSpaces(node: TSESTree.Node) {
  return isJsxText(node)
    && isWhiteSpace(node)
    && node.raw.includes("\n");
}

function isSignificantChildren(node: TSESTree.JSXElement["children"][number]) {
  return node.type !== AST_NODE_TYPES.JSXText || !isPaddingSpaces(node);
}
