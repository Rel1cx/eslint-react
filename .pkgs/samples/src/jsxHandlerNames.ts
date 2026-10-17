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

      // Guard: must have an expression container value
      const value = node.value;
      if (value?.type !== "JSXExpressionContainer") return;

      const expression = ast.unwrap(value.expression);

      // Case: direct reference (onClick={handleClick})
      if (expression.type === "Identifier") {
        const handlerName = expression.name;
        // Guard: handler name already follows the convention
        if (HANDLER_FUNC_REGEX.test(handlerName)) return;
        context.report({
          message: `Handler function "${handlerName}" should be named "${eventHandlerPrefix}${propName.slice(eventHandlerPropPrefix.length)}..."`,
          node: expression,
        });
        return;
      }

      // Case: inline function (onClick={() => {}})
      if (expression.type !== "ArrowFunctionExpression" && expression.type !== "FunctionExpression") return;
      // Guard: inline functions are allowed unless checkInlineFunction is enabled
      if (!checkInlineFunction) return;
      context.report({
        message: [
          `Inline function handlers are not allowed for "${propName}".`,
          `Extract it to a named "${eventHandlerPrefix}${propName.slice(eventHandlerPropPrefix.length)}" function.`,
        ].join(" "),
        node: expression,
      });
    },
  });
}
