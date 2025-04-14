import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";

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
      description: "Enforces that a function with the `use` prefix should use at least one Hook inside of it.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUsePrefix:
        "If your function doesn't call any Hooks, avoid the 'use' prefix. Instead, write it as a regular function without the 'use' prefix.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useHookCollector();
  return {
    ...listeners,
    "Program:exit"(program) {
      const allHooks = ctx.getAllHooks(program);
      for (const { id, name, node, hookCalls } of allHooks.values()) {
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
          node: id ?? node,
          data: {
            name,
          },
        });
      }
    },
  };
}
