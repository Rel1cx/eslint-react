import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { constTrue } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Traverses up the AST to find a parent JSX attribute node that matches a given test
 *
 * @param node - The starting AST node
 * @param test - Optional predicate function to test if the attribute meets criteria
 *               Defaults to always returning true (matches any attribute)
 * @returns The first matching JSX attribute node found when traversing upwards, or undefined
 */
export function findParentAttribute(
  node: TSESTree.Node,
  test: (node: TSESTree.JSXAttribute) => boolean = constTrue,
): TSESTree.JSXAttribute | unit {
  // Type guard function to verify if a node is a JSXAttribute and passes the test
  const guard = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
    return node.type === T.JSXAttribute && test(node);
  };

  // Use AST utility to walk up the tree and find the first matching node
  return AST.findParentNode(node, guard);
}
