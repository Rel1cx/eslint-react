import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

// ---------------------------------------------------------------------------
// Pure string utilities (no AST knowledge)
// ---------------------------------------------------------------------------

/**
 * Trim leading / trailing whitespace the same way React does when rendering
 * JSX text.  Whitespace that contains a newline is stripped entirely;
 * whitespace that stays on the same line is preserved.
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
// Child-node predicates (single JSXChild)
// ---------------------------------------------------------------------------

/**
 * Whether a JSX child node is whitespace-only text (spaces, tabs, newlines).
 *
 * Returns `false` for any non-text node (elements, expression containers, etc.).
 */
export function isWhitespaceText(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "";
}

/**
 * Whether a JSX child node is whitespace-only text that spans at least one
 * line break — i.e. the "padding" that React would trim away when rendering.
 */
export function isPaddingSpaces(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "" && node.raw.includes("\n");
}

// ---------------------------------------------------------------------------
// Attribute helpers (single JSXAttribute + source text)
// ---------------------------------------------------------------------------

/**
 * Compute the removal range for a JSX attribute, consuming any leading
 * whitespace (spaces, tabs, newlines) so the resulting markup stays clean.
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
    if (
      expression.type === AST.JSXElement
      || expression.type === AST.JSXFragment
    ) {
      return exprText;
    }

    // All other expressions must be wrapped in braces to remain valid JSX
    return `{${exprText}}`;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Element helpers (JSXElement | JSXFragment)
// ---------------------------------------------------------------------------

/**
 * Whether a JSX element (or fragment) has meaningful children content —
 * that is, at least one child that is **not** whitespace-only text.
 */
export function hasMeaningfulChildren(node: ast.TSESTreeJSXElementLike): boolean {
  if (node.children.length === 0) return false;
  return !node.children.every(isWhitespaceText);
}

/**
 * Compute the range covering **all** children content of a JSX element or
 * fragment (from the start of the first child to the end of the last child).
 *
 * Returns `null` when there are no children at all.
 */
export function getChildrenContentRange(node: ast.TSESTreeJSXElementLike): [start: number, end: number] | null {
  if (node.children.length === 0) return null;
  const first = node.children[0]!;
  const last = node.children[node.children.length - 1]!;
  return [first.range[0], last.range[1]];
}

/**
 * Extract the raw source text of an element's / fragment's children
 * (everything between the opening and closing tags).
 *
 * Returns `""` for self-closing elements like `<Fragment />`.
 */
export function getChildrenSourceText(context: RuleContext, node: ast.TSESTreeJSXElementLike): string {
  const { sourceCode } = context;
  const opener = node.type === AST.JSXFragment
    ? node.openingFragment
    : node.openingElement;
  const closer = node.type === AST.JSXFragment
    ? node.closingFragment
    : node.closingElement;

  if (opener.type === AST.JSXOpeningElement && opener.selfClosing) {
    return "";
  }

  return sourceCode.text.slice(opener.range[1], closer?.range[0]);
}
