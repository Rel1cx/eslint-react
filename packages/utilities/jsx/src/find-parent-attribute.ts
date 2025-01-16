import * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import { returnTrue } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Find the parent JSX attribute node of a node
 * @param node The node to find the parent attribute of
 * @param test The test to apply to the parent attribute
 * @returns The parent attribute node or undefined
 */
export function findParentAttribute(
  node: TSESTree.Node,
  test: (node: TSESTree.JSXAttribute) => boolean = returnTrue,
): TSESTree.JSXAttribute | _ {
  const guard = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
    return node.type === T.JSXAttribute && test(node);
  };

  return AST.findParentNode(node, guard);
}
