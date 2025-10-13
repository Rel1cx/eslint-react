import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getJsxElementType } from "./jsx-element-type";

/**
 * Determines if a JSX element is a host element
 * Host elements in React start with lowercase letters (e.g., div, span)
 *
 * @param context - ESLint rule context
 * @param node - AST node to check
 * @returns boolean indicating if the element is a host element
 */
export function isJsxHostElement(context: RuleContext, node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

/**
 * Determines if a JSX element is a React Fragment
 * Fragments can be imported from React and used like <Fragment> or <React.Fragment>
 *
 * @param context - ESLint rule context
 * @param node - AST node to check
 * @returns boolean indicating if the element is a Fragment with type narrowing
 */
export function isJsxFragmentElement(context: RuleContext, node: TSESTree.Node): node is TSESTree.JSXElement {
  if (node.type !== T.JSXElement) return false;
  return getJsxElementType(context, node)
    .split(".")
    .at(-1) === "Fragment";
}
