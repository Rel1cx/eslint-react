import type { RuleFunction } from "@eslint-react/kit";

/** Forbid this.setState() calls. */
export function noSetState(): RuleFunction {
  return (context) => ({
    CallExpression(node) {
      const { callee } = node;

      // Check if callee is this.setState
      if (
        callee.type === "MemberExpression"
        && callee.object.type === "ThisExpression"
        && callee.property.type === "Identifier"
        && callee.property.name === "setState"
      ) {
        context.report({
          node,
          message: "This use of 'this.setState()' is not allowed.",
        });
      }
    },
  });
}
