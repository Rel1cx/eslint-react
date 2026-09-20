import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { isEmptyStringExpression, isPaddingWhitespace, isWhitespaceText } from "./text";

/**
 * Get the meaningful children of a JSX element or fragment.
 *
 * Mirrors Babel's `buildChildren` helper:
 * 1. Iterate over `element.children`.
 * 2. Skip `JSXText` nodes that clean to nothing (padding whitespace).
 * 3. Skip `JSXExpressionContainer` nodes whose expression is empty.
 * 4. Skip empty string expressions (`{""}`), which produce no DOM node.
 * 5. Collect everything else.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns The children nodes that contribute to rendered output.
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  const children: TSESTree.JSXChild[] = [];

  for (const child of element.children) {
    // Padding whitespace (whitespace containing a newline) that React trims away.
    if (isPaddingWhitespace(child)) continue;

    if (child.type === AST.JSXExpressionContainer) {
      if (child.expression.type === AST.JSXEmptyExpression) continue;
      // { "" } produces no DOM node.
      if (isEmptyStringExpression(child)) continue;
    }

    children.push(child);
  }

  return children;
}

/**
 * Check if the element has at least one meaningful child, that is, a child that
 * is not purely whitespace text or an empty string expression (`{""}`).
 *
 * Unlike {@link getChildren} (which only filters whitespace containing a newline),
 * this check treats any whitespace-only text as non-meaningful, so `hasChildren(node)`
 * is not always equal to `getChildren(node).length > 0` (ex: `<div> </div>`).
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns `true` if the element has at least one meaningful child.
 */
export function hasChildren(element: TSESTreeJSXElementLike) {
  if (element.children.length === 0) return false;
  return !element.children.every((child) => isWhitespaceText(child) || isEmptyStringExpression(child));
}
