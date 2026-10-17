import type { RuleFunction } from "@eslint-react/kit";

/** Prevent inline functions and `.bind()` in JSX props. */
export function jsxNoBind(): RuleFunction {
  return (context, { ast }) => {
    /** Check whether the expression is a `.bind()` call. */
    const isBindCall = (expr: ReturnType<typeof ast.unwrap>) => {
      if (expr.type !== "CallExpression") return false;
      const callee = ast.unwrap(expr.callee);
      return callee.type === "MemberExpression"
        && callee.property.type === "Identifier"
        && callee.property.name === "bind";
    };

    return {
      JSXAttribute(node) {
        const value = node.value;

        // Guard: must be expression container
        if (value?.type !== "JSXExpressionContainer") return;

        const expr = ast.unwrap(value.expression);

        // Report: inline function
        if (expr.type === "ArrowFunctionExpression" || expr.type === "FunctionExpression") {
          context.report({ message: "JSX props should not use inline functions.", node });
          return;
        }

        // Report: .bind() call
        if (isBindCall(expr)) {
          context.report({ message: "JSX props should not use .bind().", node });
        }
      },
    };
  };
}
