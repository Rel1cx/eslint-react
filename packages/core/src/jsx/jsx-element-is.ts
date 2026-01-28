import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { JsxConfig } from "./jsx-config";
import { getJsxElementType } from "./jsx-element-type";

/**
 * Determine if a JSX element is a host element
 * Host elements in React start with lowercase letters (e.g., div, span)
 *
 * @param context ESLint rule context
 * @param node AST node to check
 * @returns boolean indicating if the element is a host element
 */
export function isJsxHostElement(context: RuleContext, node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

/**
 * Determine if a JSX element is a React Fragment
 * Fragments can be imported from React and used like <Fragment> or <React.Fragment>
 *
 * @param context ESLint rule context
 * @param node AST node to check
 * @param jsxConfig Optional JSX configuration
 * @param jsxConfig.jsxFragmentFactory Name of the fragment factory (e.g., React.Fragment)
 * @returns boolean indicating if the element is a Fragment
 */
export function isJsxFragmentElement(
  context: RuleContext,
  node: TSESTree.Node,
  jsxConfig?: Pick<JsxConfig, "jsxFragmentFactory">,
) {
  if (node.type !== T.JSXElement) return false;
  const fragment = jsxConfig?.jsxFragmentFactory?.split(".").at(-1) ?? "Fragment";
  return getJsxElementType(context, node)
    .split(".")
    .at(-1) === fragment;
}
