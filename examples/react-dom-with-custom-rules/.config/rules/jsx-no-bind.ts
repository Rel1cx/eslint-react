import type { RuleDefinition } from "@eslint-react/kit";

/** Prevent inline functions and `.bind()` in JSX props. */
export function jsxNoBind(): RuleDefinition {
  return {
    name: "jsx-no-bind",
    make: (context) => ({
      JSXAttribute(node) {
        const value = node.value;
        if (value?.type !== "JSXExpressionContainer") return;
        switch (true) {
          case value.expression.type === "ArrowFunctionExpression":
          case value.expression.type === "FunctionExpression":
            context.report({ node, message: "JSX props should not use inline functions." });
            break;
          case value.expression.type === "CallExpression"
            && value.expression.callee.type === "MemberExpression"
            && value.expression.callee.property.type === "Identifier"
            && value.expression.callee.property.name === "bind":
            context.report({ node, message: "JSX props should not use .bind()." });
            break;
        }
      },
    }),
  };
}
