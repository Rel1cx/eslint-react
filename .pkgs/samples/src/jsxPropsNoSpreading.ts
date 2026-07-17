import type { RuleFunction } from "@eslint-react/kit";

/** Disallow JSX props spreading. */
export function jsxPropsNoSpreading(): RuleFunction {
  return (context) => ({
    JSXSpreadAttribute(node) {
      context.report({
        message: "Props spreading is not allowed.",
        node,
      });
    },
  });
}
