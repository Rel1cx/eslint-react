import type { RuleDefinition } from "@eslint-react/kit";

/** Disallow JSX props spreading. */
export const jsxPropsNoSpreading = (): RuleDefinition => {
  return (context) => ({
    JSXSpreadAttribute(node) {
      context.report({
        node,
        message: "Props spreading is not allowed.",
      });
    },
  });
};
