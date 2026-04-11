import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-find-dom-node";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'findDOMNode'.",
    },
    messages: {
      default: "[Deprecated] Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const findDOMNode = "findDOMNode";

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `findDOMNode` is not present in the file
  if (!context.sourceCode.text.includes(findDOMNode)) return {};
  return defineRuleListener(
    {
      CallExpression(node) {
        const { callee } = node;
        switch (callee.type) {
          // Handles cases like `findDOMNode()`.
          case AST.Identifier:
            if (callee.name === findDOMNode) {
              context.report({ messageId: "default", node });
            }
            return;
          // Handles cases like `ReactDOM.findDOMNode()`.
          case AST.MemberExpression:
            if (callee.property.type === AST.Identifier && callee.property.name === findDOMNode) {
              context.report({ messageId: "default", node });
            }
            return;
        }
      },
    },
  );
}
