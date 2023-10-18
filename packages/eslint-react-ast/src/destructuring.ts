import type { TSESTree } from "@typescript-eslint/types";

import { isOneOf, NodeType } from "./node-types";

/**
 * Check if a Parameter node is a destructor parameter
 * @param node The node to check
 * @returns boolean indicating whether the node is a destructor parameter
 */
export const isDestructorParameter: (
    node: TSESTree.Node,
) => node is TSESTree.ArrayPattern | TSESTree.AssignmentPattern | TSESTree.ObjectPattern | TSESTree.RestElement = isOneOf([
    NodeType.ArrayPattern,
    NodeType.AssignmentPattern,
    NodeType.ObjectPattern,
    NodeType.RestElement,
]);
