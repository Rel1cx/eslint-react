import type { RuleFunction } from "@eslint-react/kit";

/** Forbid this.setState() calls. */
export function noSetState(): RuleFunction {
  return (context, { ast }) => {
    // Fast path: skip if `setState` is not present in the file
    if (!context.sourceCode.text.includes("setState")) return {};

    return {
      CallExpression(node) {
        const callee = ast.unwrap(node.callee);
        // Guard: only match `this.setState(...)` calls
        if (
          callee.type !== "MemberExpression"
          || callee.object.type !== "ThisExpression"
          || callee.property.type !== "Identifier"
          || callee.property.name !== "setState"
        ) {
          return;
        }
        context.report({
          message: "This use of 'this.setState()' is not allowed.",
          node,
        });
      },
    };
  };
}
