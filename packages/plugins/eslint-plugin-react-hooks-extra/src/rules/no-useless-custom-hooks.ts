import * as AST from "@eslint-react/ast";
import { useHookCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-custom-hooks";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isNodeContainsUseCallComments(
  node: TSESTree.Node,
  context: RuleContext,
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
      noUselessCustomHooks: "A custom Hook '{{name}}' should use at least one other hook.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useHookCollector();
    return {
      ...listeners,
      "Program:exit"(node) {
        const allHooks = ctx.getAllHooks(node);
        for (const { name, node, hookCalls } of allHooks.values()) {
          // Skip empty functions
          if (AST.isEmptyFunction(node)) continue;
          // Skip useful hooks
          if (hookCalls.length > 0) continue;
          // Skip hooks with comments that contain calls to other hooks
          if (isNodeContainsUseCallComments(node, context)) continue;
          context.report({
            messageId: "noUselessCustomHooks",
            node,
            data: {
              name: name.value,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
