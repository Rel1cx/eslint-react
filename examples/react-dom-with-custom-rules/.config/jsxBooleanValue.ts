import type { RuleFunction } from "@eslint-react/kit";

/** Enforce shorthand for boolean JSX attributes. */
export function jsxBooleanValue(): RuleFunction {
  return (context) => ({
    JSXAttribute(node) {
      const { value } = node;

      // › Guard: must have expression value
      if (value?.type !== "JSXExpressionContainer") return;

      // › Guard: must be literal true
      if (value.expression.type !== "Literal" || value.expression.value !== true) return;

      // › Report: prefer shorthand form
      context.report({
        node,
        message: "Omit the value for boolean attributes.",
        fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
      });
    },
  });
}
