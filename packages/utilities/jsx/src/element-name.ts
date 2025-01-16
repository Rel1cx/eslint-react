import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { toString } from "./to-string";

/**
 * Get the stringified name of a JSX element
 * @param node The JSX element node
 * @returns The name of the element
 */
export function getElementName(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  if (node.type === T.JSXFragment) {
    return "";
  }
  return toString(node.openingElement.name);
}
