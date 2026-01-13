import * as AST from "@eslint-react/ast";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { isUseRefCall } from "@eslint-react/core";
import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-ref";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow unnecessary use of 'useRef' hook.",
    },
    messages: {
      noUnnecessaryUseRef: "Use of 'useRef' is unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const stack: TSESTree.CallExpression[] = [];
  const urefs: TSESTree.CallExpression[] = [];

  return {
    CallExpression(node) {
      stack.push(node);
      if (isUseRefCall(node)) {
        urefs.push(node);
      }
    },
    "CallExpression:exit"(node) {
      stack.pop();
    },
    MemberExpression(node) {
      // TODO: Implement logic to collect `ref.current` and `someRef.current`
    },
  };
}
