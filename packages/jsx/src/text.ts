import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Collapse a multiline JSX text string following React's whitespace rules.
 *
 * This mirrors Babel's `cleanJSXElementLiteralChild` algorithm:
 * 1. Split the raw text into lines.
 * 2. Find the last non-empty line.
 * 3. Trim leading spaces on non-first lines and trailing spaces on non-last lines.
 * 4. Collapse tabs into spaces.
 * 5. Append a single space after each non-last non-empty line.
 * @param text The raw JSX text string to collapse.
 * @returns The collapsed string, or `null` if the text contains only whitespace.
 * @see https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts
 */
export function collapseMultilineText(text: string): string | null {
  const lines = text.split(/\r\n|\n|\r/);

  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/[^ \t]/.exec(lines[i] ?? "") != null) {
      lastNonEmptyLine = i;
    }
  }

  let str = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";

    const isFirstLine = i === 0;
    const isLastLine = i === lines.length - 1;
    const isLastNonEmptyLine = i === lastNonEmptyLine;

    // Replace rendered whitespace tabs with spaces
    let trimmedLine = line.replace(/\t/g, " ");

    // Trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^ +/, "");
    }
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/ +$/, "");
    }

    if (trimmedLine.length > 0) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }
      str += trimmedLine;
    }
  }

  return str === "" ? null : str;
}

/**
 * Check whether a JSX child node is whitespace padding that React would
 * trim away during rendering.
 *
 * A child is considered whitespace padding when it is a `JSXText` node whose
 * content is empty after applying React's whitespace normalization
 * (see {@link collapseMultilineText}, modelled after Babel's
 * `cleanJSXElementLiteralChild`) **and** it contains a newline. This is the
 * whitespace that appears between JSX tags purely for formatting.
 *
 * For the looser "any whitespace-only text" check, see {@link isWhitespaceText}.
 * @param node A JSX child node.
 * @returns `true` when the node is purely formatting whitespace.
 */
export function isPaddingWhitespace(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return collapseMultilineText(node.value) == null && node.value.includes("\n");
}

/**
 * Check whether a JSX child node is any whitespace-only text.
 *
 * This is a looser variant of {@link isPaddingWhitespace}; it matches every
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
