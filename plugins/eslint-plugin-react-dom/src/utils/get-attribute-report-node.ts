import type { AttributeValue } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Get the node to report for a resolved attribute value.
 *
 * Plain attributes report the value node (falling back to the attribute when
 * there is no value node); spread attributes report the spread argument.
 * @param value The resolved attribute value.
 * @returns The node to report on.
 */
export function getAttributeReportNode(value: AttributeValue): TSESTree.Node {
  return value.kind === "spreadProps"
    ? value.attribute.argument
    : value.node ?? value.attribute;
}
