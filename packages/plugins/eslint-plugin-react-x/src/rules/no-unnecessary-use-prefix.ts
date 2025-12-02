import * as AST from "@eslint-react/ast";
import { useHookCollector } from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-prefix";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const WELL_KNOWN_HOOKS = [
  "useMDXComponents",
];

// Checks if a node contains comments that suggest a Hook usage like `use(Context)` or `useMyHook()`
function containsUseComments(context: RuleContext, node: TSESTree.Node) {
  return context.sourceCode
    .getCommentsInside(node)
    .some(({ value }) => /use\([\s\S]*?\)/u.test(value) || /use[A-Z0-9]\w*\([\s\S]*?\)/u.test(value));
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
  const { ctx, listeners } = useHookCollector();

  return {
    ...listeners,
    "Program:exit"(program) {
      for (const { id, name, node, hookCalls } of ctx.getAllHooks(program)) {
        // If the function calls at least one real hook, it's a valid custom hook, so we skip it
        if (hookCalls.length > 0) {
          continue;
        }
        // If the function has an empty body, no need to flag it
        if (AST.isFunctionEmpty(node)) {
          continue;
        }
        // If the function is in a list of known hooks, skip it
        if (WELL_KNOWN_HOOKS.includes(name)) {
          continue;
        }
        // If comments suggest hook usage, skip to avoid false positives
        if (containsUseComments(context, node)) {
          continue;
        }
        // If the hook is defined inside a `vi.mock` callback for testing, skip it
        if (AST.findParentNode(node, AST.isViMockCallback) != null) {
          continue;
        }
        // If none of the above, it's a regular function with 'use' prefix. Report it
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
