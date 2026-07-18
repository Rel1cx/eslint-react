import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getElementFullType } from "./element-type";

/**
 * A test that determines whether a JSX element matches.
 *
 * - `string` matches against the full element type (ex: "div", "React.Fragment")
 * - `string[]` matches when the element type equals any of the given strings
 * - `function` receives the element type string and returns a boolean.
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
 * When called without a test, the function acts as a simple type-guard
 * for `JSXElement | JSXFragment`.
 * @param node The AST node to test.
 * @param test Optional test to match the element type against.
 * @returns `true` when the node is a matching JSX element.
 */
export function isElement(node: TSESTree.Node | null | undefined, test?: ElementTest): node is TSESTreeJSXElementLike {
  if (node == null) return false;
  if (node.type !== AST.JSXElement && node.type !== AST.JSXFragment) {
    return false;
  }
  // No test, confirm that it is a JSX element / fragment.
  if (test == null) return true;
  const elementType = getElementFullType(node);
  switch (typeof test) {
    case "string":
      return elementType === test;
    case "function":
      return test(elementType, node);
    default:
      return test.includes(elementType);
  }
}

/**
 * Check whether a node is a React Fragment element.
 *
 * Recognizes both the shorthand `<>...</>` syntax (`JSXFragment`) and the
 * explicit `<Fragment>` / `<React.Fragment>` form (`JSXElement`).
 *
 * The comparison is performed against the self name (last dot-separated
 * segment) of both the node and the configured factory, so `<React.Fragment>`
 * matches `"React.Fragment"` and `<Fragment>` matches `"Fragment"`.
 * @param node The AST node to test.
 * @param jsxFragmentFactory The configured fragment factory string (ex: "React.Fragment").
 * @returns `true` when the node represents a React Fragment.
 */
export function isFragmentElement(node: TSESTree.Node, jsxFragmentFactory = "React.Fragment"): node is TSESTreeJSXElementLike {
  if (node.type === AST.JSXFragment) return true;
  if (node.type !== AST.JSXElement) return false;

  const fragment = jsxFragmentFactory.split(".").at(-1) ?? "Fragment";
  return getElementFullType(node).split(".").at(-1) === fragment;
}

/**
 * Check whether a node is a host (intrinsic / DOM) element.
 *
 * A host element is a `JSXElement` whose tag name is a plain `JSXIdentifier`
 * starting with a lowercase letter, the same heuristic React uses to
 * distinguish `<div>` from `<MyComponent>`.
 * @param node The AST node to test.
 * @returns `true` when the node is a `JSXElement` with a lowercase tag name.
 */
export function isHostElement(node: TSESTree.Node): node is TSESTree.JSXElement {
  if (node.type !== AST.JSXElement) return false;
  const name = node.openingElement.name;
  if (name.type === AST.JSXIdentifier) {
    return /^[a-z]/u.test(name.name);
  }
  if (name.type === AST.JSXNamespacedName) {
    return /^[a-z]/u.test(name.name.name);
  }
  return false;
}
