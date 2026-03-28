import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link jsxNoLiterals}. */
export type JsxNoLiteralsOptions = {
  /** Enforces no string literals used as children, wrapped or unwrapped. */
  noStrings?: boolean;
  /** An array of unique string values that would otherwise warn, but will be ignored. */
  allowedStrings?: string[];
  /** When `true` the rule ignores literals used in props. */
  ignoreProps?: boolean;
};

/** Disallow usage of string literals in JSX. */
export function jsxNoLiterals(
  { noStrings = false, allowedStrings = [], ignoreProps = false }: JsxNoLiteralsOptions = {},
): RuleDefinition {
  const allowedSet = new Set(allowedStrings);
  return (context) => ({
    Literal(node) {
      if (typeof node.value !== "string") return;
      const text = node.value.trim();
      if (text === "" || allowedSet.has(text)) return;

      const parent = node.parent;
      if (!parent) return;

      if (parent.type === "JSXAttribute") {
        if (!ignoreProps) {
          context.report({
            node,
            message: `String literals are not allowed in JSX props. Use {'${text}'} instead.`,
          });
        }
        return;
      }

      if (parent.type === "JSXExpressionContainer") return;

      if (parent.type === "JSXElement" || parent.type === "JSXFragment") {
        if (noStrings) {
          context.report({
            node,
            message: `String literals are not allowed as JSX children.`,
          });
        } else {
          context.report({
            node,
            message: `String literals should be wrapped in JSX expression: {'${text}'}`,
          });
        }
      }
    },
    JSXText(node) {
      const text = node.value.trim();
      if (text === "" || allowedSet.has(text)) return;

      if (noStrings) {
        context.report({
          node,
          message: `String literals are not allowed as JSX children.`,
        });
      } else {
        context.report({
          node,
          message: `String literals should be wrapped in JSX expression: {'${text}'}`,
        });
      }
    },
  });
}
