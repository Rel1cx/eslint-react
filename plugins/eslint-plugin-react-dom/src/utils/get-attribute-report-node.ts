import type { AttributeValue } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Get the node to report for a resolved attribute value: the value node, or
 * the attribute itself when there is no value node.
 * @param value The resolved attribute value.
 * @returns The node to report on.
 */
export function getAttributeReportNode(value: AttributeValue): TSESTree.Node {
  return value.node ?? value.attribute;
}
