import { createRule } from "@/utils/create-rule";
import { Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `findDOMNode` is not present in the file
  if (!context.sourceCode.text.includes("findDOMNode")) return {};
  return {
    CallExpression(node) {
      // Handles cases like `findDOMNode()` and `ReactDOM.findDOMNode()`.
      if (Extract.getCalleeName(node) === "findDOMNode") {
        context.report({ messageId: "default", node });
      }
    },
  };
}
