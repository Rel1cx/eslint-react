import * as ast from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-trailing-semicolon";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows trailing semicolons that would be rendered as text nodes.",
    },
    messages: {
      default: "Suspicious trailing semicolon in JSX. This semicolon will be rendered as text nodes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function hasSuspiciousSemicolon(text: string) {
  return text.startsWith(";\n") || text.startsWith(";\r");
}

export function create(context: RuleContext<MessageID, []>) {
  const visitorFunction = (node: TSESTree.JSXText | TSESTree.Literal) => {
    if (!ast.isJSXElementLike(node.parent)) {
      return;
    }
    if (!hasSuspiciousSemicolon(context.sourceCode.getText(node))) {
      return;
    }
    context.report({
      messageId: "default",
      node,
    });
  };
  return defineRuleListener({
    JSXText: visitorFunction,
    Literal: visitorFunction,
  });
}
