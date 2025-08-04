import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getElementType } from "./jsx-element-type";

export function isHostElement(context: RuleContext, node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}

export function isFragmentElement(context: RuleContext, node: TSESTree.Node): node is TSESTree.JSXElement {
  if (node.type !== T.JSXElement) return false;
  return getElementType(context, node)
    .split(".")
    .at(-1) === "Fragment";
}
