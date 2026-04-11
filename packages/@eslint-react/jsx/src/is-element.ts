import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { getElementFullType } from "./get-element-type";

/**
 * A test that determines whether a JSX element matches.
 *
 * - `string`     — matches against the full element type (e.g. `"div"`,
 *                  `"React.Fragment"`)
 * - `string[]`   — matches when the element type equals **any** of the
 *                  given strings
 * - `function`   — receives the element type string and returns a boolean
 */
export type ElementTest =
  | string
  | readonly string[]
  | ((elementType: string, node: TSESTreeJSXElementLike) => boolean);

/**
 * Check whether a node is a `JSXElement` (or `JSXFragment`) and optionally
 * matches a given test.
 *
 * Modelled after
 * [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element):
 * the `test` parameter controls what counts as a match.
 *
 * When called **without** a test, the function acts as a simple type-guard
 * for `JSXElement | JSXFragment`.
 *
 * @param node - The AST node to test.
 * @param test - Optional test to match the element type against.
 * @returns `true` when the node is a matching JSX element.
 *
 * @example
 * ```ts
 * import { isElement } from "@eslint-react/jsx";
 *
 * // Type-guard only — any JSX element or fragment
 * if (isElement(node)) { … }
 *
 * // Match a single tag name
 * if (isElement(node, "iframe")) { … }
 *
 * // Match one of several tag names
 * if (isElement(node, ["button", "input", "select"])) { … }
 *
 * // Custom predicate
 * if (isElement(node, (type) => type.endsWith(".Provider"))) { … }
 * ```
 */
export function isElement(
  node: TSESTree.Node | null | undefined,
  test?: ElementTest,
): node is TSESTreeJSXElementLike {
  if (node == null) return false;
  if (node.type !== AST.JSXElement && node.type !== AST.JSXFragment) {
    return false;
  }

  // No test — simply confirm that it is a JSX element / fragment.
  if (test == null) return true;

  const elementType = getElementFullType(node);

  if (typeof test === "string") {
    return elementType === test;
  }

  if (typeof test === "function") {
    return test(elementType, node);
  }

  // Array of strings — match any.
  return test.includes(elementType);
}
