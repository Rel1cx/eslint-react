import * as AST from "@eslint-react/ast";
import { useHookCollector } from "@eslint-react/core";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-custom-hook";

export type MessageID = CamelCase<typeof RULE_NAME>;

// Hooks that are not call other hooks are redundant
// In React, hooks are like colored functions, and defining a custom hook that doesn't call other hooks is like defining a generator function that doesn't yield or an async function that doesn't await.
// "Custom Hooks may call other Hooks (that’s their whole purpose)." from https://react.dev/warnings/invalid-hook-call-warning
// Further reading: https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce custom hooks to use at least one other hook inside",
    },
    messages: {
      noRedundantCustomHook: "A custom hook '{{name}}' should use at least one other hook.",
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
          if (hookCalls.length > 0) continue;
          context.report({
            messageId: "noRedundantCustomHook",
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
