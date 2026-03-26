import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Warn on custom hooks that don't call other hooks. */
export function noUnnecessaryUsePrefix(): RuleDefinition {
  return {
    name: "no-unnecessary-use-prefix",
    make: (context, { collect }) => {
      const { query, visitor } = collect.hooks(context);

      return merge(visitor, {
        "Program:exit"(program) {
          for (const hook of query.all(program)) {
            if (hook.hookCalls.length === 0) {
              context.report({
                node: hook.node,
                message:
                  `Custom hook "${hook.name}" doesn't call any hooks. A custom hook should use at least one hook, otherwise it's just a regular function.`,
              });
            }
          }
        },
      });
    },
  };
}
