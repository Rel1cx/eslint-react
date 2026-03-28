import type { RuleDefinition } from "@eslint-react/kit";

/** Require the project to use React 19. */
export function requireReact19(): RuleDefinition {
  return (context, { settings }) => ({
    Program(program) {
      if (!settings.version.startsWith("19.")) {
        context.report({
          node: program,
          message: `This project requires React 19, but detected version ${settings.version}.`,
        });
      }
    },
  });
}
