import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { stringifyJsx } from "./jsx-stringify";

/**
 * Extracts the element type name from a JSX element or fragment
 * For JSX elements, returns the stringified name (e.g., "div", "Button", "React.Fragment")
 * For JSX fragments, returns an empty string
 *
 * @param context - ESLint rule context
 * @param node - JSX element or fragment node
 * @returns String representation of the element type
 */
export function getJsxElementType(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  if (node.type === T.JSXFragment) {
    return "";
  }
  return stringifyJsx(node.openingElement.name);
}
