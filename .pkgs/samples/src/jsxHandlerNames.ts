import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link jsxHandlerNames}. */
export type JsxHandlerNamesOptions = {
  /** Whether to check inline functions (default: false). */
  checkInlineFunction?: boolean;
  /** Prefix for event handler functions (default: "handle"). */
  eventHandlerPrefix?: string;
  /** Prefix for event handler props (default: "on"). */
  eventHandlerPropPrefix?: string;
};

/** Enforce naming convention for JSX event handlers. */
export function jsxHandlerNames(options: JsxHandlerNamesOptions = {}): RuleFunction {
  const {
    checkInlineFunction = false,
    eventHandlerPrefix = "handle",
    eventHandlerPropPrefix = "on",
  } = options;
  const EVENT_HANDLER_REGEX = new RegExp(`^${eventHandlerPropPrefix}[A-Z]`);
  const HANDLER_FUNC_REGEX = new RegExp(`^${eventHandlerPrefix}[A-Z]`);

  return (context, { ast }) => ({
    JSXAttribute(node) {
      // Guard: must be event handler prop (onXxx)
      if (node.name.type !== "JSXIdentifier") return;
      const propName = node.name.name;
      if (!EVENT_HANDLER_REGEX.test(propName)) return;

      const value = node.value;
      if (value == null) return;

      if (value.type === "JSXExpressionContainer") {
        const expression = ast.unwrap(value.expression);

        // Case: direct reference (onClick={handleClick})
        if (expression.type === "Identifier") {
          const handlerName = expression.name;
          if (!HANDLER_FUNC_REGEX.test(handlerName)) {
            context.report({
              message: `Handler function "${handlerName}" should be named "${eventHandlerPrefix}${propName.slice(eventHandlerPropPrefix.length)}..."`,
              node: expression,
            });
          }
          return;
        }

        // Case: inline function (onClick={() => {}})
        if (expression.type === "ArrowFunctionExpression" || expression.type === "FunctionExpression") {
          if (checkInlineFunction) {
            context.report({
              message: `Inline function handlers are not allowed for "${propName}". Extract it to a named "${eventHandlerPrefix}${
                propName.slice(eventHandlerPropPrefix.length)
              }" function.`,
              node: expression,
            });
          }
          return;
        }
      }
    },
  });
}
