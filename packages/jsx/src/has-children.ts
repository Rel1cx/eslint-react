import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { isEmptyStringExpression, isWhitespaceText } from "./is-whitespace";

/**
 * Check whether a JSX element (or fragment) has meaningful children, that is,
 * at least one child that is not purely whitespace text or an empty string expression
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
 * @param element A `JSXElement` or `JSXFragment` node
 * @returns `true` when the element has at least one meaningful child
 */
export function hasChildren(element: TSESTreeJSXElementLike) {
  if (element.children.length === 0) return false;
  return !element.children.every((child) => isWhitespaceText(child) || isEmptyStringExpression(child));
}
