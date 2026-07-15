import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { collapseMultilineText } from "./collapse-multiline-text";

/**
 * Check whether a JSX child node is whitespace padding that React would
 * trim away during rendering.
 *
 * A child is considered whitespace padding when it is a `JSXText` node whose
 * content is empty after applying React's whitespace normalization
 * (see {@link collapseMultilineText}, modelled after Babel's
 * `cleanJSXElementLiteralChild`). This is the whitespace that appears between
 * JSX tags purely for formatting.
 * @param node A JSX child node.
 * @returns `true` when the node is purely formatting whitespace.
 */
export function isWhitespace(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return collapseMultilineText(node.value) == null && node.value.includes("\n");
}

/**
 * Check whether a JSX child node is any whitespace-only text.
 *
 * This is a looser variant of {@link isWhitespace}; it matches every
 * `JSXText` node whose raw content is empty after trimming, regardless of
 * whether it contains a newline.
 * @param node A JSX child node.
 * @returns `true` when the node is a whitespace-only `JSXText`.
 */
export function isWhitespaceText(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "";
}

/**
 * Check whether a JSX child node is an empty string expression (`{""}`).
 *
 * React's reconciler and SSR renderer explicitly skip empty strings,
 * producing no DOM node (see `ReactChildFiber.js` and `ReactFizzConfigDOM.js`).
 * Such expressions are therefore treated as non-rendered children, in the same
 * way as whitespace padding.
 * @param node A JSX child node.
 * @returns `true` when the node is a `{""}` expression container.
 */
export function isEmptyStringExpression(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXExpressionContainer) return false;
  const expr = node.expression;
  if (expr.type !== AST.Literal) return false;
  return expr.value === "";
}
