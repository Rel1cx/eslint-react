import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-flush-sync";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "warns against using `flushSync`",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noFlushSync: "Using 'flushSync' is uncommon and can hurt the performance of your app.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("flushSync")) return {};
    return {
      CallExpression(node) {
        const { callee } = node;
        switch (callee.type) {
          case T.Identifier:
            if (callee.name === "flushSync") {
              context.report({ messageId: "noFlushSync", node });
            }
            return;
          case T.MemberExpression:
            if (callee.property.type === T.Identifier && callee.property.name === "flushSync") {
              context.report({ messageId: "noFlushSync", node });
            }
            return;
        }
      },
    };
  },
  defaultOptions: [],
});
