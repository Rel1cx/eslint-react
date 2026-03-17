import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

import { getElementType } from "./get-element-type";

/**
 * Check whether a node is a React **Fragment** element.
 *
 * Recognises both the shorthand `<>…</>` syntax (`JSXFragment`) and the
 * explicit `<Fragment>` / `<React.Fragment>` form (`JSXElement`).
 *
 * The comparison is performed against the **self name** (last dot‑separated
 * segment) of both the node and the configured factory, so
 * `<React.Fragment>` matches `"React.Fragment"` and `<Fragment>` matches
 * `"Fragment"`.
 *
 * @param node                - The AST node to test.
 * @param jsxFragmentFactory  - The configured fragment factory string
 *                              (e.g. `"React.Fragment"`).  Defaults to
 *                              `"React.Fragment"`.
 * @returns `true` when the node represents a React Fragment.
 *
 * @example
 * ```ts
 * // Using the default factory
 * if (isFragmentElement(node)) { … }
 *
 * // With a custom factory from jsxConfig
 * const config = getJsxConfig(context);
 * if (isFragmentElement(node, config.jsxFragmentFactory)) { … }
 * ```
 */
export function isFragmentElement(
  node: TSESTree.Node,
  jsxFragmentFactory = "React.Fragment",
): node is TSESTreeJSXElementLike {
  if (node.type === AST.JSXFragment) return true;
  if (node.type !== AST.JSXElement) return false;

  const fragment = jsxFragmentFactory.split(".").at(-1) ?? "Fragment";
  return getElementType(node).split(".").at(-1) === fragment;
}
