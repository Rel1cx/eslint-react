import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a JSX element (or fragment) has **meaningful** children —
 * that is, at least one child that is not purely whitespace text.
 *
 * A `JSXText` child whose `raw` content is empty after trimming is
 * considered non-meaningful regardless of whether it contains a line break.
 * This matches React's rendering behaviour where whitespace-only text nodes
 * do not produce visible output.
 *
 * @param element - A `JSXElement` or `JSXFragment` node.
 * @returns `true` when the element has at least one meaningful child.
 *
 * @example
 * ```ts
 * import { hasChildren } from "@eslint-react/jsx";
 *
 * // <div>hello</div>           -> true
 * // <div>  {expr}  </div>      -> true
 * // <div>   </div>             -> false  (whitespace-only)
 * // <div>                      -> false  (whitespace-only, with newlines)
 * // </div>
 * // <div></div>                -> false  (no children at all)
 *
 * if (hasChildren(node)) {
 *   // element renders visible content
 * }
 * ```
 */
export function hasChildren(element: TSESTreeJSXElementLike): boolean {
  if (element.children.length === 0) return false;
  return !element.children.every((child: TSESTree.JSXChild) => isWhitespaceText(child));
}

// ---------------------------------------------------------------------------
// Internal helper
// ---------------------------------------------------------------------------

/**
 * Whether a JSX child node is a whitespace-only `JSXText` node.
 *
 * Any `JSXText` whose raw content consists entirely of whitespace characters
 * (spaces, tabs, newlines, etc.) is considered whitespace text.  Non-text
 * nodes always return `false`.
 * @param node The JSX child node to check.
 */
function isWhitespaceText(node: TSESTreeJSXElementLike["children"][number]): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "";
}
