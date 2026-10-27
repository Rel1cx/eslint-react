import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { and, not, or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { collapseMultilineText } from "./text";

/**
 * Check if the node is whitespace-only `JSXText`, based on its raw source text.
 *
 * Matches any `JSXText` node whose raw text is empty after trimming, regardless
 * of newlines. Same-line whitespace matches here; {@link isPaddingWhitespace}
 * additionally requires a line feed and uses the decoded value.
 *
 * Reads `node.raw` rather than the entity-decoded `value`, so entity text such
 * as `&nbsp;` or `&#32;` is treated as content even when its decoded value is
 * whitespace. This is a syntactic check on the source text, not a model of
 * React's whitespace collapsing.
 * @param node The node to check.
 * @returns `true` if the node is whitespace-only `JSXText` in its raw form.
 * @remarks
 * This is a content predicate, not a type guard: a `false` result does not
 * mean the node is not `JSXText`, only that it is not whitespace-only text.
 */
export function isWhitespaceText(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXText && node.raw.trim() === "";
}

/**
 * Check if the node is whitespace-only `JSXText` that this module treats as
 * padding: it cleans to nothing (see {@link collapseMultilineText}) and contains
 * a line feed (`\n`).
 *
 * Reads the entity-decoded `node.value`, so an entity-encoded line break such as
 * `&#10;` matches even though the raw text contains no line break. For a
 * whitespace check based on raw source text, see {@link isWhitespaceText}.
 * @param node The node to check.
 * @returns `true` if the node is purely formatting whitespace by its decoded value.
 * @remarks
 * This is a content predicate, not a type guard: a `false` result does not
 * mean the node is not `JSXText`.
 */
export function isPaddingWhitespace(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXText && collapseMultilineText(node.value) == null && node.value.includes("\n");
}

/**
 * Check if the node is an empty expression container (`{}`, `{/* comment *\/}`).
 *
 * An empty `JSXExpressionContainer` holds no expression, so it produces no DOM
 * node and is treated as non-rendered content, same as whitespace padding.
 * @param node The node to check.
 * @returns `true` if the node is an empty `JSXExpressionContainer`.
 * @remarks
 * This is a content predicate, not a type guard: a `false` result does not
 * mean the node is not a `JSXExpressionContainer`.
 */
export function isEmptyExpressionContainer(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.JSXEmptyExpression;
}

/**
 * Check if the node is an empty string literal expression (`{""}`).
 *
 * Only a literal empty string matches; template literals and other expressions
 * that happen to evaluate to `""` are not evaluated by this predicate.
 * @param node The node to check.
 * @returns `true` if the node is an expression container holding an empty string literal.
 * @remarks
 * This is a content predicate, not a type guard: a `false` result does not
 * mean the node is not a `JSXExpressionContainer`.
 */
export function isEmptyStringExpression(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.Literal && node.expression.value === "";
}

// A child that renders nothing: an empty expression container (`{}` or `{/* comment *\/}`) or an empty string literal (`{""}`).
const isEmptyExpression = or(isEmptyExpressionContainer, isEmptyStringExpression);
const isMeaningfulContent = and(not(isWhitespaceText), not(isEmptyExpression));
const isNonPaddingContent = and(not(isPaddingWhitespace), not(isEmptyExpression));

/**
 * Check if the child carries content for the "meaningful children" semantics.
 *
 * Whitespace-only `JSXText` as determined by {@link isWhitespaceText} (which
 * reads raw source text and therefore keeps entity text), empty expression
 * containers, and empty string literal expressions are excluded. This is a
 * syntactic check: `{null}`, `{false}`, and other dynamic expressions still
 * count as children content.
 * @param node The JSX child to check.
 * @returns `true` if the child is not syntactically empty.
 */
export function isMeaningfulChild(node: TSESTree.JSXChild): boolean {
  return isMeaningfulContent(node);
}

/**
 * Get the children of a JSX element or fragment after removing syntactic JSX
 * artifacts: padding whitespace (see {@link isPaddingWhitespace}), empty
 * expression containers, and empty string literal expressions.
 *
 * Same-line whitespace is kept because it is not padding by this definition and
 * can render as a text node. This is a syntactic filter, not a runtime-rendering
 * guarantee: `{null}`, `{false}`, and other expressions that may render nothing
 * are kept.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that remain after removing padding artifacts.
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter(isNonPaddingContent);
}

/**
 * Get the children of a JSX element or fragment that are not syntactically empty.
 *
 * Unlike {@link getChildren}, all whitespace-only `JSXText` as determined by
 * {@link isWhitespaceText} is excluded, so `getMeaningfulChildren` is stricter
 * for same-line whitespace (ex: `<div> </div>` yields no children here but one
 * child from `getChildren`). Like `getChildren`, empty expression containers and
 * empty string literal expressions are also excluded, and this is a syntactic
 * check: `{null}`, `{false}`, and other dynamic expressions count as children.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that are not syntactically empty.
 */
export function getMeaningfulChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter(isMeaningfulChild);
}

/**
 * Check if the element has at least one syntactically non-empty child.
 *
 * A child counts when it is not whitespace-only `JSXText` as determined by
 * {@link isWhitespaceText}, an empty expression container (`{}` or
 * `{/* comment *\/}`), or an empty string literal expression (`{""}`). Same-line
 * whitespace does not count, unlike in {@link getChildren}. `{null}`, `{false}`,
 * and other dynamic expressions do count.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns `true` if the element has at least one syntactically non-empty child.
 */
export function hasMeaningfulChildren(element: TSESTreeJSXElementLike): boolean {
  return element.children.some(isMeaningfulChild);
}
