import { isEmptyExpressionContainer, isPaddingWhitespace } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check if a JSX child is syntactic content rather than a formatting artifact.
 *
 * Formatting whitespace (see `isPaddingWhitespace`, which follows Babel's
 * decoded-value cleaning) and empty expression containers are treated as
 * artifacts. Same-line whitespace, empty string expressions, and dynamic
 * expressions (`{null}`, `{false}`) still count: this mirrors the JSX
 * transform's content model, not React's rendering (which ignores `null`,
 * `undefined`, booleans, and `""`).
 * @param child The JSX child to check.
 * @returns `true` if the child is syntactic content.
 */
export function isChildContent(child: TSESTree.JSXChild): boolean {
  return !isPaddingWhitespace(child) && !isEmptyExpressionContainer(child);
}
