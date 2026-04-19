import type { RuleFunction } from "@eslint-react/kit";

/** Prevent inline functions and `.bind()` in JSX props. */
export function jsxNoBind(): RuleFunction {
  return (context) => ({
    JSXAttribute(node) {
      const value = node.value;

      // › Guard: must be expression container
      if (value?.type !== "JSXExpressionContainer") return;

      const expr = value.expression;

      // ─── Detect forbidden patterns ─────────────────
      switch (true) {
        case expr.type === "ArrowFunctionExpression":
        case expr.type === "FunctionExpression":
          context.report({ node, message: "JSX props should not use inline functions." });
          break;
        case expr.type === "CallExpression"
          && expr.callee.type === "MemberExpression"
          && expr.callee.property.type === "Identifier"
          && expr.callee.property.name === "bind":
          context.report({ node, message: "JSX props should not use .bind()." });
          break;
      }
    },
  });
}
