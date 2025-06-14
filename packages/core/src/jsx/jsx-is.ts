import type { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/kit";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getElementType } from "./jsx-element-type";
import { hasAttribute } from "./jsx-has";

export function isHostElement(context: RuleContext, node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

export function isKeyedElement(context: RuleContext, node: TSESTree.Node, initialScope?: Scope) {
  return node.type === T.JSXElement
    && hasAttribute(context, "key", node.openingElement.attributes, initialScope);
}

export function isFragmentElement(
  context: RuleContext,
  node: TSESTree.Node | null | unit,
  allowJSXFragment?: false,
): node is TSESTree.JSXElement;
export function isFragmentElement(
  context: RuleContext,
  node: TSESTree.Node | null | unit,
  allowJSXFragment?: true,
): node is TSESTree.JSXElement | TSESTree.JSXFragment;
export function isFragmentElement(
  context: RuleContext,
  node: TSESTree.Node | null | unit,
  allowJSXFragment = false,
): node is TSESTree.JSXElement | TSESTree.JSXFragment {
  if (node == null) return false;
  if (node.type !== T.JSXElement && node.type !== T.JSXFragment) return false;
  if (node.type === T.JSXFragment) return allowJSXFragment;
  return getElementType(context, node).split(".").at(-1) === "Fragment";
}
