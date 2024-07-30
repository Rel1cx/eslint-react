import type { TSESTree } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

import { NodeType } from "./types";

/**
 * Checks if the given node is a function expression or arrow function expression of a class property.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a class property, `false` otherwise.
 */
export const isFunctionOfClassProperty: (node: TSESTree.Node) => boolean = isMatching({
  type: P.union([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]),
  parent: {
    type: NodeType.Property,
    parent: {
      type: NodeType.ClassBody,
    },
  },
});
