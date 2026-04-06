import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

// ---------------------------------------------------------------------------
// Pure string utilities (no AST knowledge)
// ---------------------------------------------------------------------------

/**
 * Trim leading / trailing whitespace the same way React does when rendering
 * JSX text.  Whitespace that contains a newline is stripped entirely;
 * whitespace that stays on the same line is preserved.
 * @param text The JSX text to trim.
 */
export function trimLikeReact(text: string): string {
  const leadingSpaces = /^\s*/.exec(text)?.[0] ?? "";
  const trailingSpaces = /\s*$/.exec(text)?.[0] ?? "";

  const start = leadingSpaces.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces.includes("\n")
    ? text.length - trailingSpaces.length
    : text.length;

  return text.slice(start, end);
}

// ---------------------------------------------------------------------------
// Attribute helpers (single JSXAttribute + source text)
// ---------------------------------------------------------------------------

/**
 * Compute the removal range for a JSX attribute, consuming any leading
 * whitespace (spaces, tabs, newlines) so the resulting markup stays clean.
 * @param context The rule context.
 * @param prop The JSX attribute.
 */
export function getPropRemovalRange(context: RuleContext, prop: TSESTree.JSXAttribute): [start: number, end: number] {
  const { sourceCode } = context;
  let start = prop.range[0];
  const end = prop.range[1];

  // Walk backwards over whitespace
  while (start > 0 && /\s/.test(sourceCode.text[start - 1]!)) {
    start--;
  }

  return [start, end];
}

/**
 * Extract the text to use as JSX children content from a `children` prop.
 *
 * - `children="text"`        -> `text`  (raw string, no quotes)
 * - `children={<div />}`     -> `<div />`  (JSX element, no braces)
 * - `children={<>…</>}`      -> `<>…</>`  (JSX fragment, no braces)
 * - `children={expression}`  -> `{expression}`  (wrapped in braces)
 * - `children`               -> `null`  (boolean shorthand, cannot extract)
 * @param context The rule context.
 * @param prop The JSX attribute.
 */
export function getChildrenPropText(context: RuleContext, prop: TSESTree.JSXAttribute): string | null {
  const { sourceCode } = context;
  const { value } = prop;
  if (value == null) return null;

  // children="text" -> text
  if (value.type === AST.Literal) {
    return String(value.value);
  }

  // children={expression}
  if (value.type === AST.JSXExpressionContainer) {
    const { expression } = value;
    // {  } – empty expression, nothing to extract
    if (expression.type === AST.JSXEmptyExpression) return null;

    const exprText = sourceCode.getText(expression);

    // JSX elements and fragments can be placed directly as children
    if (ast.isJSXElementLike(expression)) {
      return exprText;
    }

    // All other expressions must be wrapped in braces to remain valid JSX
    return `{${exprText}}`;
  }

  return null;
}
