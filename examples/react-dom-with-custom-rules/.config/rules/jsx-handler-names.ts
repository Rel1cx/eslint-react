import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link jsxHandlerNames}. */
export type JsxHandlerNamesOptions = {
  /** Prefix for event handler functions (default: "handle"). */
  eventHandlerPrefix?: string;
  /** Prefix for event handler props (default: "on"). */
  eventHandlerPropPrefix?: string;
  /** Whether to check inline functions (default: false). */
  checkInlineFunction?: boolean;
};

/** Enforce naming convention for JSX event handlers. */
export function jsxHandlerNames({
  eventHandlerPrefix = "handle",
  eventHandlerPropPrefix = "on",
  checkInlineFunction = false,
}: JsxHandlerNamesOptions = {}): RuleDefinition {
  const EVENT_HANDLER_REGEX = new RegExp(`^${eventHandlerPropPrefix}[A-Z]`);
  const HANDLER_FUNC_REGEX = new RegExp(`^${eventHandlerPrefix}[A-Z]`);

  return (context) => ({
    JSXAttribute(node) {
      if (node.name.type !== "JSXIdentifier") return;
      const propName = node.name.name;
      if (!EVENT_HANDLER_REGEX.test(propName)) return;

      const value = node.value;
      if (!value) return;

      if (value.type === "JSXExpressionContainer") {
        const expression = value.expression;

        if (expression.type === "Identifier") {
          const handlerName = expression.name;
          if (!HANDLER_FUNC_REGEX.test(handlerName)) {
            context.report({
              node: expression,
              message: `Handler function "${handlerName}" should be named "${eventHandlerPrefix}${
                propName.slice(eventHandlerPropPrefix.length)
              }..."`,
            });
          }
          return;
        }

        if (
          checkInlineFunction
          && (expression.type === "ArrowFunctionExpression" || expression.type === "FunctionExpression")
        ) {
          return;
        }
      }
    },
  });
}
