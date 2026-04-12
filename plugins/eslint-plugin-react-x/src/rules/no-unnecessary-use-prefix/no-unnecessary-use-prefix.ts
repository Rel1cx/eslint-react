import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { WELL_KNOWN_HOOKS, containsUseComments, isTestMockCallback } from "./lib";

import { createRule } from "../../utils";

export const RULE_NAME = "no-unnecessary-use-prefix";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that a function with the 'use' prefix uses at least one Hook inside it.",
    },
    messages: {
      default:
        "If your function doesn't call any Hooks, avoid the 'use' prefix. Instead, write it as a regular function without the 'use' prefix.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { api, visitor } = core.getHookCollector(context);

  return merge(visitor, {
    "Program:exit"(program) {
      for (const { id, name, hookCalls, node } of api.getAllHooks(program)) {
        if (name == null) {
          continue;
        }
        // If the function calls at least one real hook, it's a valid custom hook, so we skip it
        if (hookCalls.length > 0) {
          continue;
        }
        // If the function has an empty body, no need to flag it
        if (ast.isFunctionEmpty(node)) {
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
        if (ast.findParent(node, isTestMockCallback) != null) {
          continue;
        }
        // If none of the above, it's a regular function with 'use' prefix. Report it
        context.report({
          data: {
            name,
          },
          messageId: "default",
          node: id ?? node,
        });
      }
    },
  });
}
