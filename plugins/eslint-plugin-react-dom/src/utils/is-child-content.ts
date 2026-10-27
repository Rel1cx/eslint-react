import { isEmptyExpressionContainer, isPaddingWhitespace } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check if a JSX child produces content at runtime.
 *
 * Formatting whitespace and empty expression containers are omitted by the JSX
 * transform, so they do not count as children. Same-line whitespace and empty
 * string expressions do count.
 * @param child The JSX child to check.
 * @returns `true` if the child carries content.
 */
export function isChildContent(child: TSESTree.JSXChild): boolean {
  return !isPaddingWhitespace(child) && !isEmptyExpressionContainer(child);
}
