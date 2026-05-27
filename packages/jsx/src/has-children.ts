import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a JSX element (or fragment) has **meaningful** children —
 * that is, at least one child that is not purely whitespace text or an empty
 * string expression.
 *
 * A `JSXText` child whose `raw` content is empty after trimming is considered
 * non-meaningful because it is typically a code-formatting artefact
 * (indentation between tags). While React's client renderer preserves these
 * nodes as text nodes, they rarely represent intentionally rendered content.
 *
 * An empty string expression (`children={""}`) is also considered
 * non-meaningful because React's reconciler and SSR renderer explicitly skip
 * empty strings, producing no DOM node.
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
 * // <div>{""}</div>            -> false  (empty string expression)
 *
 * if (hasChildren(node)) {
 *   // element renders visible content
 * }
 * ```
 */
export function hasChildren(element: TSESTreeJSXElementLike): boolean {
  if (element.children.length === 0) return false;
  return !element.children.every((child: TSESTree.JSXChild) =>
    isWhitespaceText(child) || isEmptyStringExpression(child)
  );
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Whether a JSX child node is a whitespace-only `JSXText` node.
 *
 * Any `JSXText` whose raw content consists entirely of whitespace characters
 * (spaces, tabs, newlines, etc.) is considered whitespace text.  Non-text
 * nodes always return `false`.
 * @param node The JSX child node to check.
 */
function isWhitespaceText(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "";
}

/**
 * Whether a JSX child node is an empty string expression (`{""}`).
 *
 * React's reconciler and SSR renderer skip empty strings, producing no DOM
 * node. These expressions are therefore considered non-meaningful children.
 *
 * @param node The JSX child node to check.
 */
function isEmptyStringExpression(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXExpressionContainer) return false;
  const expr = node.expression;
  if (expr.type !== AST.Literal) return false;
  return expr.value === "";
}
