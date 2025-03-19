import * as AST from "@eslint-react/ast";
import { useHookCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-prefix";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isNodeContainsUseCallComments(
  context: RuleContext,
  node: TSESTree.Node,
) {
  return context.sourceCode
    .getCommentsInside(node)
    .some((comment) => /use\w+\(/u.test(comment.value));
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce custom Hooks to use at least one other hook inside",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUsePrefix: "A custom Hook '{{name}}' should use at least one other hook.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = useHookCollector();
  return {
    ...listeners,
    "Program:exit"(node) {
      const allHooks = ctx.getAllHooks(node);
      for (const { name, node, hookCalls } of allHooks.values()) {
        // Skip empty functions
        if (AST.isEmptyFunction(node)) {
          continue;
        }
        // Skip useful hooks
        if (hookCalls.length > 0) {
          continue;
        }
        // Skip hooks with comments that contain calls to other hooks
        if (isNodeContainsUseCallComments(context, node)) {
          continue;
        }
        context.report({
          messageId: "noUnnecessaryUsePrefix",
          node,
          data: {
            name,
          },
        });
      }
    },
  };
}
