import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { WELL_KNOWN_HOOKS, containsUseComments, isInTestMock } from "./lib";

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
      default: "If your function doesn't call any Hooks, avoid the 'use' prefix. Instead, write it as a regular function without the 'use' prefix.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
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
        if (core.isFunctionEmpty(node)) {
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
        // If the hook is defined inside a test mock (ex: `vi.mock`, `mock.module`), skip it
        if (isInTestMock(node)) {
          continue;
        }
        // If none of the above, it's a regular function with 'use' prefix. Report it
        context.report({
          messageId: "default",
          node: id ?? node,
        });
      }
    },
  });
}
