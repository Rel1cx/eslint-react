import type { RuleFunction } from "@eslint-react/kit";

/** Forbid this.setState() calls. */
export function noSetState(): RuleFunction {
  return (context, { is }) => {
    // Fast path: skip if `setState` is not present in the file
    if (!context.sourceCode.text.includes("setState")) return {};

    return {
      CallExpression(node) {
        // Guard: only match `this.setState(...)` calls
        if (!is.APICall("this.setState")(node)) return;

        context.report({
          message: "This use of 'this.setState()' is not allowed.",
          node,
        });
      },
    };
  };
}
