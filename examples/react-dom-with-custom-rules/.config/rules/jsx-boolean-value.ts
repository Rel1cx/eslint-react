import type { RuleDefinition } from "@eslint-react/kit";

/** Enforce shorthand for boolean JSX attributes. */
export function jsxBooleanValue(): RuleDefinition {
  return {
    name: "jsx-boolean-value",
    make: (context) => ({
      JSXAttribute(node) {
        const { value } = node;
        if (value?.type !== "JSXExpressionContainer") return;
        if (value.expression.type !== "Literal" || value.expression.value !== true) return;
        context.report({
          node,
          message: "Omit the value for boolean attributes.",
          fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
        });
      },
    }),
  };
}
