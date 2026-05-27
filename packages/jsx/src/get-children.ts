import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get the **meaningful** children of a JSX element or fragment.
 *
 * Filters out nodes that React will not render into the DOM:
 *
 * 1. "Padding spaces" — `JSXText` nodes that consist entirely of whitespace
 *    and contain at least one newline. These are code-formatting artefacts
 *    (indentation between tags). While React's client renderer preserves them
 *    as text nodes, browser HTML parsers may discard them during hydration,
 *    causing hydration mismatches.
 *
 * 2. Empty string expressions — `JSXExpressionContainer` nodes whose expression
 *    is a string literal with value `""`. React's reconciler and SSR renderer
 *    explicitly skip empty strings, producing no DOM node
 *    (see ReactChildFiber.js and ReactFizzConfigDOM.js).
 *
 * @param element - A `JSXElement` or `JSXFragment` node.
 * @returns An array of children nodes that contribute to rendered output.
 *
 * @example
 * ```ts
 * import { getChildren } from "@eslint-react/jsx";
 *
 * // <div>
 * //   <span />
 * // </div>
 * //
 * // Raw children: [JSXText("\n  "), JSXElement(<span />), JSXText("\n")]
 * // getChildren:  [JSXElement(<span />)]
 *
 * const meaningful = getChildren(node);
 * ```
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  return element.children.filter((child: TSESTree.JSXChild) => {
    if (isPaddingSpaces(child)) return false;
    if (isEmptyStringExpression(child)) return false;
    return true;
  });
}

/**
 * A `JSXText` node is considered **padding spaces** when it is purely
 * whitespace *and* contains at least one newline character.
 *
 * These nodes are code-formatting artefacts (indentation between JSX tags).
 * While React's client renderer preserves them as text nodes, browser HTML
 * parsers may discard them during hydration, leading to hydration mismatches.
 *
 * @param node The JSX child node to check.
 * @internal
 */
function isPaddingSpaces(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "" && node.raw.includes("\n");
}

/**
 * A `JSXExpressionContainer` node is considered an empty string expression
 * when it wraps a string literal with value `""`.
 *
 * React's reconciler explicitly ignores empty strings
 * (`typeof newChild === 'string' && newChild !== ''` in ReactChildFiber.js),
 * and the SSR renderer skips them as well (`if (text === '') { return; }`
 * in ReactFizzConfigDOM.js). They produce no DOM node.
 *
 * @param node The JSX child node to check.
 * @internal
 */
function isEmptyStringExpression(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXExpressionContainer) return false;
  const expr = node.expression;
  if (expr.type !== AST.Literal) return false;
  return expr.value === "";
}
