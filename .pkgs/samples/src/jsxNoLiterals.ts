import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

/** Options for {@link jsxNoLiterals}. */
export type JsxNoLiteralsOptions = {
  /** An array of unique string values that would otherwise warn, but will be ignored. */
  allowedStrings?: string[];
  /** When `true` the rule ignores literals used in props. */
  ignoreProps?: boolean;
  /** Enforces no string literals used as children, wrapped or unwrapped. */
  noStrings?: boolean;
};

/** Disallow usage of string literals in JSX. */
export function jsxNoLiterals(options: JsxNoLiteralsOptions = {}): RuleFunction {
  const { allowedStrings = [], ignoreProps = true, noStrings = false } = options;
  const allowedSet = new Set(allowedStrings);

  return (context) => {
    /** Report a string literal or JSX text used as a child, honoring the `noStrings` option. */
    const reportLiteralInChildren = (node: TSESTree.Literal | TSESTree.JSXText, text: string) => {
      if (noStrings) {
        context.report({
          message: `String literals are not allowed as JSX children.`,
          node,
        });
        return;
      }
      context.report({
        message: `String literals should be wrapped in JSX expression: {'${text}'}`,
        node,
      });
    };

    return {
      Literal(node) {
        // Guard: only string literals are relevant
        if (typeof node.value !== "string") return;
        const text = node.value.trim();
        // Guard: skip empty and allowed strings
        if (text === "" || allowedSet.has(text)) return;

        const parent = node.parent;

        // Case: string literal used as a prop value
        if (parent.type === "JSXAttribute") {
          // Guard: literals in props are ignored unless ignoreProps is disabled
          if (ignoreProps) return;
          context.report({
            message: [
              "String literals are not allowed in JSX props.",
              `Use {'${text}'} instead.`,
            ].join(" "),
            node,
          });
          return;
        }

        // Guard: already wrapped in an expression container
        if (parent.type === "JSXExpressionContainer") return;

        // Case: string literal used as a child of a JSX element or fragment
        if (parent.type === "JSXElement" || parent.type === "JSXFragment") {
          reportLiteralInChildren(node, text);
        }
      },

      JSXText(node) {
        const text = node.value.trim();
        // Guard: skip empty and allowed strings
        if (text === "" || allowedSet.has(text)) return;

        reportLiteralInChildren(node, text);
      },
    };
  };
}
