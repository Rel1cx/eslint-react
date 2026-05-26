import type { RuleFunction } from "@eslint-react/kit";

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
export function jsxNoLiterals(options: JsxNoLiteralsOptions = {}): RuleFunction {
  const { noStrings = false, allowedStrings = [], ignoreProps = true } = options;
  const allowedSet = new Set(allowedStrings);
  return (context) => ({
    // ─── Check literal text children ───────────────
    Literal(node) {
      if (typeof node.value !== "string") return;
      const text = node.value.trim();
      if (text === "" || allowedSet.has(text)) return;

      const parent = node.parent;
      if (!parent) return;

      // ─── Case: prop value ────────────────────────
      if (parent.type === "JSXAttribute") {
        if (!ignoreProps) {
          context.report({
            node,
            message: `String literals are not allowed in JSX props. Use {'${text}'} instead.`,
          });
        }
        return;
      }

      // ─── Case: already wrapped ───────────────────
      if (parent.type === "JSXExpressionContainer") return;

      // ─── Case: child of element/fragment ─────────
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

    // ─── Check JSX text nodes ──────────────────────
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
