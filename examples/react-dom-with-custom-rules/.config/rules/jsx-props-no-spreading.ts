import type { RuleDefinition } from "@eslint-react/kit";

/** Disallow JSX props spreading. */
export function jsxPropsNoSpreading(): RuleDefinition {
  return {
    name: "jsx-props-no-spreading",
    make: (context) => ({
      JSXSpreadAttribute(node) {
        context.report({
          node,
          message: "Props spreading is not allowed.",
        });
      },
    }),
  };
}
