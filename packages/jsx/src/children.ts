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
 * @returns An array of children nodes that contribute to rendered output.
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
 * Check whether a JSX element (or fragment) has meaningful children, that is,
 * at least one child that is not purely whitespace text or an empty string expression.
 *
 * A `JSXText` child whose `raw` content is empty after trimming is considered
 * non-meaningful because it is typically a code-formatting artifact
 * (indentation between tags). While React's client renderer preserves these
 * nodes as text nodes, they rarely represent intentionally rendered content.
 *
 * An empty string expression (`children={""}`) is also considered
 * non-meaningful because React's reconciler and SSR renderer explicitly skip
 * empty strings, producing no DOM node.
 *
 * Unlike {@link getChildren} (which only filters whitespace that contains a
 * newline) this check treats any whitespace-only text as non-meaningful
 * (see {@link isWhitespaceText}). As a result `hasChildren(node)` is not
 * always equal to `getChildren(node).length > 0`: they differ for
 * whitespace-only children that have no newline, such as `<div> </div>` or
 * `<div>\t\t</div>`. Choose the API that matches your rule's intent.
 * @param element A `JSXElement` or `JSXFragment` node.
 * @returns `true` when the element has at least one meaningful child.
 */
export function hasChildren(element: TSESTreeJSXElementLike) {
  if (element.children.length === 0) return false;
  return !element.children.every((child) => isWhitespaceText(child) || isEmptyStringExpression(child));
}
