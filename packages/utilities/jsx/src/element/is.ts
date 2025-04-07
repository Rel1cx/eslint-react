import type { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { hasAttribute } from "../has-attribute";
import { getElementType } from "./element-type";

export function isHostElement(node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

export function isKeyedElement(node: TSESTree.Node, initialScope?: Scope) {
  return node.type === T.JSXElement
    && hasAttribute("key", node.openingElement.attributes, initialScope);
}

function isFragmentElement(node: TSESTree.Node | null | _, allowJSXFragment?: false): node is TSESTree.JSXElement;
function isFragmentElement(
  node: TSESTree.Node | null | _,
  allowJSXFragment?: true,
): node is TSESTree.JSXElement | TSESTree.JSXFragment;
function isFragmentElement(
  node: TSESTree.Node | null | _,
  allowJSXFragment = false,
): node is TSESTree.JSXElement | TSESTree.JSXFragment {
  if (node == null) return false;
  if (node.type !== T.JSXElement && node.type !== T.JSXFragment) return false;
  if (node.type === T.JSXFragment) return allowJSXFragment;
  return getElementType(node).split(".").at(-1) === "Fragment";
}

export { isFragmentElement };
