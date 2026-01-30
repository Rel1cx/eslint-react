import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-flush-sync";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'flushSync'.",
    },
    messages: {
      noFlushSync: "Using 'flushSync' is uncommon and can hurt the performance of your app.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const flushSync = "flushSync";

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `flushSync` is not present in the file
  if (!context.sourceCode.text.includes(flushSync)) return {};
  return {
    CallExpression(node) {
      const { callee } = node;
      switch (callee.type) {
        // Handle direct calls like `flushSync()`
        case AST.Identifier:
          if (callee.name === flushSync) {
            context.report({ messageId: "noFlushSync", node });
          }
          return;
        // Handle member access calls like `ReactDOM.flushSync()`
        case AST.MemberExpression:
          if (callee.property.type === AST.Identifier && callee.property.name === flushSync) {
            context.report({ messageId: "noFlushSync", node });
          }
          return;
      }
    },
  };
}
