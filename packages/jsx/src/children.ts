import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { collapseMultilineText } from "./text";

/**
 * Check if the node is whitespace-only text.
 *
 * Looser variant of {@link isPaddingWhitespace}; matches every `JSXText` node
 * whose raw content is empty after trimming, regardless of newlines.
 *
 * Reads `node.raw` rather than the entity-decoded `value`; for whitespace-only
 * text the two are identical (an entity is never whitespace), matching React's
 * behavior of rendering entity text like `&nbsp;` as a real text node.
 * @param node The node to check.
 * @returns `true` if the node is a whitespace-only `JSXText`.
 */
export function isWhitespaceText(node: TSESTree.Node | null | undefined): node is TSESTree.JSXText {
  return node?.type === AST.JSXText && node.raw.trim() === "";
}

/**
 * Check if the node is whitespace padding that React would trim away during
 * rendering, that is, a `JSXText` node that cleans to nothing (see
 * {@link collapseMultilineText}) and contains a newline.
 *
 * For the looser "any whitespace-only text" check, see {@link isWhitespaceText}.
 *
 * Reads the entity-decoded `node.value`; `value` and `raw` differ only when the
 * text contains HTML entities (ex: `&nbsp;`), which is never whitespace-only,
 * so reading either field yields the same result here.
 * @param node The node to check.
 * @returns `true` if the node is purely formatting whitespace.
 */
export function isPaddingWhitespace(node: TSESTree.Node | null | undefined): node is TSESTree.JSXText {
  return node?.type === AST.JSXText && collapseMultilineText(node.value) == null && node.value.includes("\n");
}

/**
 * Check if the node is an empty expression container (`{}`, `{/* comment *\/}`).
 *
 * An empty `JSXExpressionContainer` holds no expression, so it produces no DOM
 * node and is treated as non-rendered content, same as whitespace padding.
 * @param node The node to check.
 * @returns `true` if the node is an empty `JSXExpressionContainer`.
 */
export function isEmptyExpressionContainer(node: TSESTree.Node | null | undefined): node is TSESTree.JSXExpressionContainer {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.JSXEmptyExpression;
}

/**
 * Check if the node is an empty string literal expression (`{""}`).
 *
 * Only a literal empty string matches; template literals and other expressions
 * that happen to evaluate to `""` are not evaluated by this predicate.
 * @param node The node to check.
 * @returns `true` if the node is a `{""}` expression container.
 */
export function isEmptyStringExpression(node: TSESTree.Node | null | undefined): node is TSESTree.JSXExpressionContainer {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.Literal && node.expression.value === "";
}

/**
 * Check if the child carries content for the "meaningful children" semantics.
 *
 * Any whitespace-only text (including same-line whitespace), empty expression
 * containers, and empty string literal expressions are excluded. This is a
 * syntactic check: `{null}`, `{false}`, and other dynamic expressions still
 * count as children content.
 */
function isMeaningfulChild(node: TSESTree.JSXChild): boolean {
  return !isWhitespaceText(node) && !isEmptyExpressionContainer(node) && !isEmptyStringExpression(node);
}

/**
 * Get the children of a JSX element or fragment after removing syntactic JSX
 * artifacts: padding whitespace, empty expression containers, and empty string
 * literal expressions.
 *
 * Same-line whitespace is kept because it renders as a text node. This is a
 * syntactic filter, not a runtime-rendering guarantee: `{null}`, `{false}`, and
 * other expressions that may render nothing are kept.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that remain after removing padding artifacts.
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter((child) =>
    !isPaddingWhitespace(child)
    && !isEmptyExpressionContainer(child)
    && !isEmptyStringExpression(child)
  );
}

/**
 * Get the children of a JSX element or fragment that are not syntactically empty.
 *
 * Unlike {@link getChildren}, any whitespace-only text is excluded, so
 * `getMeaningfulChildren` is stricter for same-line whitespace
 * (ex: `<div> </div>` yields no children here but one child from `getChildren`).
 * Like `getChildren`, this is a syntactic check: `{null}`, `{false}`, and other
 * dynamic expressions count as children.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that are not syntactically empty.
 */
export function getMeaningfulChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter(isMeaningfulChild);
}

/**
 * Check if the element has at least one syntactically non-empty child.
 *
 * A child counts when it is not whitespace-only text, an empty expression
 * container (`{}`), or an empty string literal expression (`{""}`). Same-line
 * whitespace does not count, unlike in {@link getChildren}. `{null}`, `{false}`,
 * and other dynamic expressions do count.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns `true` if the element has at least one syntactically non-empty child.
 */
export function hasMeaningfulChildren(element: TSESTreeJSXElementLike): boolean {
  return element.children.some(isMeaningfulChild);
}
