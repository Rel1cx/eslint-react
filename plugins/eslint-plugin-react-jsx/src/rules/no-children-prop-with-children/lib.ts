import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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

// ---------------------------------------------------------------------------
// Element helpers (JSXElement | JSXFragment)
// ---------------------------------------------------------------------------

/**
 * Compute the range covering **all** children content of a JSX element or
 * fragment (from the start of the first child to the end of the last child).
 *
 * Returns `null` when there are no children at all.
 * @param node The JSX element or fragment.
 */
export function getChildrenContentRange(node: TSESTreeJSXElementLike): [start: number, end: number] | null {
  if (node.children.length === 0) return null;
  const first = node.children[0]!;
  const last = node.children[node.children.length - 1]!;
  return [first.range[0], last.range[1]];
}
