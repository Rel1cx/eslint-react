import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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

/**
 * Extract the raw source text of an element's / fragment's children
 * (everything between the opening and closing tags).
 *
 * Returns `""` for self-closing elements like `<Fragment />`.
 * @param context The rule context.
 * @param node The JSX element or fragment.
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

  // Handle malformed JSX where closer might be null
  if (closer == null) {
    return "";
  }

  return sourceCode.text.slice(opener.range[1], closer.range[0]);
}
