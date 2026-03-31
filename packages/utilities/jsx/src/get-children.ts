import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Get the **meaningful** children of a JSX element or fragment.
 *
 * Filters out "padding spaces" — `JSXText` nodes that consist entirely of
 * whitespace and contain at least one newline.  These nodes are artefacts of
 * source formatting that React trims away during rendering and are therefore
 * not considered meaningful content.
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
  return element.children.filter((child: TSESTree.JSXChild) => !isPaddingSpaces(child));
}

/**
 * A `JSXText` node is considered **padding spaces** when it is purely
 * whitespace *and* contains at least one newline character.
 *
 * These nodes are formatting artefacts (indentation between JSX tags) that
 * React discards at render time.
 *
 * @param node The JSX child node to check.
 * @internal
 */
function isPaddingSpaces(node: TSESTree.JSXChild): boolean {
  if (node.type !== AST.JSXText) return false;
  return node.raw.trim() === "" && node.raw.includes("\n");
}
