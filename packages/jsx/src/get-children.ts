import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { isEmptyStringExpression, isWhitespace } from "./is-whitespace";

/**
 * Get the **meaningful** children of a JSX element or fragment.
 *
 * Filters out nodes that React will not render into the DOM:
 *
 * 1. "Padding spaces" — `JSXText` nodes that consist entirely of whitespace
 *    and contain at least one newline (see {@link isWhitespace}). These are
 *    code-formatting artefacts (indentation between tags). While React's client
 *    renderer preserves them as text nodes, browser HTML parsers may discard
 *    them during hydration, causing hydration mismatches.
 *
 * 2. Empty string expressions — `JSXExpressionContainer` nodes whose expression
 *    is a string literal with value `""` (see {@link isEmptyStringExpression}).
 *    React's reconciler and SSR renderer explicitly skip empty strings,
 *    producing no DOM node.
 *
 * Whitespace-only text **without** a newline (e.g. the single space in
 * `<div> </div>`) is intentionally **kept**, because React renders it. For
 * this reason `getChildren(node).length > 0` is **not** equivalent to
 * {@link hasChildren}, which applies a stricter "any whitespace-only text is
 * non-meaningful" heuristic. Pick the one that matches your rule's intent.
 *
 * @param element - A `JSXElement` or `JSXFragment` node.
 * @returns An array of children nodes that contribute to rendered output.
 *
 * @example
 * ```ts
 * import { getChildren } from "@eslint-react/jsx";
 *
 * // <div>
 * //   <span />
 * // </div>
 * //
 * // Raw children: [JSXText("\n  "), JSXElement(<span />), JSXText("\n")]
 * // getChildren:  [JSXElement(<span />)]
 *
 * const meaningful = getChildren(node);
 * ```
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter((child) => {
    // Padding whitespace (whitespace containing a newline) that React trims away.
    if (isWhitespace(child)) return false;
    // `{""}` produces no DOM node.
    if (isEmptyStringExpression(child)) return false;
    return true;
  });
}
