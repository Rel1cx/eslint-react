import { type RuleFunction, merge } from "@eslint-react/kit";

/** Warn on custom hooks that don't call other hooks. */
export function noUnnecessaryUsePrefix(): RuleFunction {
  return (context, { collect }) => {
    const { query, visitor } = collect.hooks(context);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const hook of query.all(program)) {
          // Guard: skip hooks that call at least one other hook
          if (hook.hookCalls.length > 0) continue;
          context.report({
            message: [
              `Custom hook "${hook.name ?? "unknown"}" doesn't call any hooks.`,
              "A custom hook should use at least one hook, otherwise it's just a regular function.",
            ].join(" "),
            node: hook.node,
          });
        }
      },
    });
  };
}
