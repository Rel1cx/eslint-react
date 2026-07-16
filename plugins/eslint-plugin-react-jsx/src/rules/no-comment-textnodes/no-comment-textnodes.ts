import { createRule } from "@/utils/create-rule";
import { Check } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-comment-textnodes";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents comment strings from being accidentally inserted into a JSX element's text nodes.",
    },
    messages: {
      default: "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function visit(node: TSESTree.JSXText) {
    if (!Check.isJSXElementOrFragment(node.parent)) return;
    if (!/^\s*\/(?:\/|\*)/mu.test(context.sourceCode.getText(node))) return;
    context.report({ messageId: "default", node });
  }
  return { JSXText: visit };
}
