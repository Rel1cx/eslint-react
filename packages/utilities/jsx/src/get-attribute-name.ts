import type { TSESTree } from "@typescript-eslint/utils";

import { toString } from "./to-string";

/**
 * Get the stringified name of a JSX attribute
 * @param node The JSX attribute node
 * @returns The name of the attribute
 */
export function getAttributeName(node: TSESTree.JSXAttribute) {
  return toString(node.name);
}
