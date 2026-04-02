import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a JSX child node is **whitespace padding** that React would
 * trim away during rendering.
 *
 * A child is considered whitespace padding when it is a `JSXText` node whose
 * raw content is empty after trimming **and** contains at least one newline.
 * This is the whitespace that appears between JSX tags purely for formatting:
 *
 * ```jsx
 * <div>
 *   <span />     ← the text between </span> and the next tag is padding
 *   <span />
 * </div>
 * ```
 *
 * Use {@link isWhitespaceText} for a looser check that also matches
 * whitespace‑only text that does **not** contain a newline.
 *
 * @param node - A JSX child node.
 * @returns `true` when the node is purely formatting whitespace.
 *
 * @example
 * ```ts
 * import { isWhitespace } from "@eslint-react/jsx";
 *
 * const meaningful = element.children.filter(
 *   (child) => !isWhitespace(child),
 * );
 * ```
 */
export function isWhitespace(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "" && node.raw.includes("\n");
}

/**
 * Check whether a JSX child node is **any** whitespace‑only text.
 *
 * This is a looser variant of {@link isWhitespace} — it matches every
 * `JSXText` node whose raw content is empty after trimming, regardless of
 * whether it contains a newline.
 *
 * @param node - A JSX child node.
 * @returns `true` when the node is a whitespace‑only `JSXText`.
 */
export function isWhitespaceText(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "";
}
