import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { and, not, or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { collapseMultilineText } from "./text";

/**
 * Check if the node is whitespace-only `JSXText` by its raw source text.
 *
 * Uses `node.raw`, not the entity-decoded `value`, so `&nbsp;`/`&#32;` count as
 * content even when their decoded value is whitespace; this is not a model of
 * React's whitespace collapsing. Same-line whitespace matches here, while
 * {@link isPaddingWhitespace} (the decoded-value counterpart) also requires a
 * line break.
 * @param node The node to check.
 * @returns `true` if the node is whitespace-only `JSXText` in its raw form.
 * @remarks
 * A content predicate, not a type guard: `false` does not mean the node is not
 * `JSXText`.
 */
export function isWhitespaceText(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXText && node.raw.trim() === "";
}

/**
 * Check if the node is whitespace-only `JSXText` that this module treats as
 * padding: it cleans to nothing (see {@link collapseMultilineText}) and holds a
 * line break (`\r\n`, `\n`, or `\r`), matching Babel's
 * `cleanJSXElementLiteralChild` line splitting.
 *
 * Uses the entity-decoded `value`, so `&#10;`/`&#13;` match even though the raw
 * text has no line break; {@link isWhitespaceText} is the raw-text counterpart.
 * @param node The node to check.
 * @returns `true` if the node is formatting whitespace by its decoded value.
 * @remarks
 * Entity-decoded line breaks follow Babel's cleaning; `tsc --jsx` may emit them
 * as children instead.
 * A content predicate, not a type guard: `false` does not mean the node is not
 * `JSXText`.
 */
export function isPaddingWhitespace(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXText && collapseMultilineText(node.value) == null && /[\r\n]/u.test(node.value);
}

/**
 * Check if the node is an empty expression container (`{}`, `{ }`,
 * `{/* comment *\/}`), including multiline and TypeScript directive comments.
 *
 * It holds a `JSXEmptyExpression`, so it renders nothing, like whitespace
 * padding. A comment attached to a real expression (`{/* comment *\/} null`) is
 * not empty.
 * @param node The node to check.
 * @returns `true` if the node is an empty `JSXExpressionContainer`.
 * @remarks
 * A content predicate, not a type guard: `false` does not mean the node is not
 * a `JSXExpressionContainer`.
 */
export function isEmptyExpressionContainer(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.JSXEmptyExpression;
}

/**
 * Check if the node is an empty string literal expression (`{""}`, `{''}`).
 *
 * Node-shape check, not an evaluation: TS wrappers (`{"" as string}`, `{""!}`,
 * `{"" satisfies string}`), template literals (`` {``} ``, `` {`${''}`} ``), and
 * calls (`{String("")}`) do not match even though their runtime value is `""`;
 * only `value === ""` matches, so `{0}`, `{false}`, and `{NaN}` do not. A comment
 * attached to the literal does not affect the result.
 * @param node The node to check.
 * @returns `true` if the node holds a bare empty string literal.
 * @remarks
 * A content predicate, not a type guard: `false` does not mean the node is not
 * a `JSXExpressionContainer`.
 */
export function isEmptyStringExpression(node: TSESTree.Node | null | undefined): boolean {
  return node?.type === AST.JSXExpressionContainer && node.expression.type === AST.Literal && node.expression.value === "";
}

// A child that renders nothing: an empty expression container (`{}` or `{/* comment *\/}`) or an empty string literal (`{""}`).
const isEmptyExpression = or(isEmptyExpressionContainer, isEmptyStringExpression);
const isMeaningfulContent = and(not(isWhitespaceText), not(isEmptyExpression));
const isNonPaddingContent = and(not(isPaddingWhitespace), not(isEmptyExpression));

/**
 * Check if the child is syntactically non-empty ("meaningful") content.
 *
 * Excluded: whitespace-only `JSXText` per {@link isWhitespaceText} (raw text, so
 * entity text such as `&nbsp;`/`&#32;` is kept), empty expression containers, and
 * bare empty string literals.
 *
 * Kept: dynamic values (`{null}`, `{false}`, `{undefined}`, `{0}`, `{NaN}`,
 * `{cond ? <A /> : null}`), TS-wrapped empty strings (`{"" as string}`, `{""!}`),
 * unevaluated template literals, and spread children.
 *
 * A syntactic check, not a rendering oracle: React renders nothing for `null`,
 * `undefined`, booleans, and `""`, but those children are kept.
 * @param node The JSX child to check.
 * @returns `true` if the child is not syntactically empty.
 * @remarks
 * Definitional difference: JSXText `" "` is not meaningful, while `{" "}` and
 * `&#32;` are, even though all three render a space text node.
 */
export function isMeaningfulChild(node: TSESTree.JSXChild): boolean {
  return isMeaningfulContent(node);
}

/**
 * Get the children of a JSX element or fragment after removing padding
 * whitespace (see {@link isPaddingWhitespace}), empty expression containers,
 * and empty string literals.
 *
 * Same-line whitespace is kept (it can render a text node); this is a syntactic
 * filter, not a rendering guarantee (`{null}`/`{false}` are kept). Compared with
 * {@link getMeaningfulChildren}:
 *
 * | Input                    | `getChildren`             | `getMeaningfulChildren` |
 * | ------------------------ | ------------------------- | ----------------------- |
 * | `" "`, `"\t"`            | kept                      | excluded                |
 * | `\r  \r` (CR-only)       | excluded                  | excluded                |
 * | `&#10;`, `&#13;`         | excluded (Babel cleaning) | kept (raw text)         |
 * | `&#32;`, `&nbsp;`        | kept                      | kept                    |
 * | `{null}`, `{false}`      | kept                      | kept                    |
 * | `{}`, `{/* comment *\/}` | excluded                  | excluded                |
 * | `{""}`                   | excluded                  | excluded                |
 * | `{"" as string}`         | kept                      | kept                    |
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that remain after removing padding artifacts.
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter(isNonPaddingContent);
}

/**
 * Get the children of a JSX element or fragment that are not syntactically
 * empty.
 *
 * Stricter than {@link getChildren} for same-line whitespace
 * (`<div> </div>` yields no children here). Dynamic expressions count, and
 * entity line breaks (`&#10;`, `&#13;`) are kept because the raw text is not
 * whitespace, whereas `getChildren` excludes them through Babel's decoded-value
 * cleaning. See {@link getChildren} for a comparison table.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children that are not syntactically empty.
 */
export function getMeaningfulChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter(isMeaningfulChild);
}

/**
 * Check if the element has at least one syntactically non-empty child.
 *
 * A child counts unless it is whitespace-only `JSXText` per
 * {@link isWhitespaceText}, an empty expression container, or a bare empty
 * string literal. Same-line whitespace does not count, unlike in
 * {@link getChildren}; `{null}`, `{false}`, and other dynamic expressions do. A
 * syntactic check, not a rendering oracle.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns `true` if the element has at least one syntactically non-empty child.
 */
export function hasMeaningfulChildren(element: TSESTreeJSXElementLike): boolean {
  return element.children.some(isMeaningfulChild);
}
