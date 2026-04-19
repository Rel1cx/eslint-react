import type { RuleFunction } from "@eslint-react/kit";

/** Prevent inline functions and `.bind()` in JSX props. */
export function jsxNoBind(): RuleFunction {
  return (context, { ast }) => ({
    JSXAttribute(node) {
      const value = node.value;

      // › Guard: must be expression container
      if (value?.type !== "JSXExpressionContainer") return;

      const expr = ast.unwrap(value.expression);

      // ─── Detect forbidden patterns ─────────────────
      switch (true) {
        case expr.type === "ArrowFunctionExpression":
        case expr.type === "FunctionExpression":
          context.report({ node, message: "JSX props should not use inline functions." });
          break;
        case expr.type === "CallExpression": {
          const callee = ast.unwrap(expr.callee);
          if (
            callee.type === "MemberExpression"
            && callee.property.type === "Identifier"
            && callee.property.name === "bind"
          ) {
            context.report({ node, message: "JSX props should not use .bind()." });
          }
          break;
        }
      }
    },
  });
}
