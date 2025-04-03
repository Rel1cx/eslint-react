import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getElementType } from "./get-element-type";
import { hasAttribute } from "./has-attribute";

export function isJsxFragmentElement(node: TSESTree.Node) {
  if (node.type !== T.JSXElement) return false;
  return getElementType(node)
    .split(".")
    .at(-1) === "Fragment";
}

export function isJsxKeyedElement(node: TSESTree.Node, initialScope?: Scope) {
  return node.type === T.JSXElement
    && hasAttribute("key", node.openingElement.attributes, initialScope);
}

export function isJsxBuiltInElement(node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

export function isJsxUserDefinedElement(node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[A-Z]/u.test(node.openingElement.name.name);
}
