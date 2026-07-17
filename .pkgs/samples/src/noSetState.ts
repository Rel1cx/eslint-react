import type { RuleFunction } from "@eslint-react/kit";

/** Forbid this.setState() calls. */
export function noSetState(): RuleFunction {
  return (context, { ast }) => ({
    CallExpression(node) {
      const callee = ast.unwrap(node.callee);
      switch (true) {
        // Check if callee is this.setState
        case callee.type === "MemberExpression"
          && callee.object.type === "ThisExpression"
          && callee.property.type === "Identifier"
          && callee.property.name === "setState":
          context.report({
            message: "This use of 'this.setState()' is not allowed.",
            node,
          });
      }
    },
  });
}
