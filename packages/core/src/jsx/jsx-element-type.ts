import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { stringifyJsx } from "./jsx-stringify";

/**
 * Get the stringified type of a JSX element
 * @param context The ESLint rule context
 * @param node The JSX element node
 * @returns The type of the element
 */
export function getElementType(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  if (node.type === T.JSXFragment) {
    return "";
  }
  return stringifyJsx(node.openingElement.name);
}
