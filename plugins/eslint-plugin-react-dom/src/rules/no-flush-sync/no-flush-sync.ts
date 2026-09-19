import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

const isFlushSyncCall = core.isAPICall("flushSync");

export const RULE_NAME = "no-flush-sync";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'flushSync'.",
    },
    messages: {
      default: "Using 'flushSync' is uncommon and can hurt the performance of your app.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `flushSync` is not present in the file
  if (!context.sourceCode.text.includes("flushSync")) return {};
  return {
    CallExpression(node) {
      // Handles cases like `flushSync()` and `ReactDOM.flushSync()`
      if (isFlushSyncCall(context, node)) {
        context.report({ messageId: "default", node });
      }
    },
  };
}
