import type { RuleFunction } from "@eslint-react/kit";

/** Require the project to use a specific React version. */
export function version(major = "19"): RuleFunction {
  return (context, { settings }) => ({
    Program(program) {
      if (!settings.version.startsWith(`${major}.`)) {
        context.report({
          node: program,
          message: `This project requires React ${major}, but detected version ${settings.version}.`,
        });
      }
    },
  });
}
