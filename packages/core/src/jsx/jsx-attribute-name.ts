import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import { stringifyJsx } from "./jsx-stringify";

/**
 * Get the stringified name of a JSX attribute
 * @param context The ESLint rule context
 * @param node The JSX attribute node
 * @returns The name of the attribute
 */
export function getJsxAttributeName(context: RuleContext, node: TSESTree.JSXAttribute) {
  return stringifyJsx(node.name);
}
