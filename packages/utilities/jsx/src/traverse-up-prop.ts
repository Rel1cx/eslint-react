import * as AST from "@eslint-react/ast";
import type { O } from "@eslint-react/eff";
import { F } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Traverses up prop node
 * @param node The AST node to start traversing from
 * @param predicate The predicate to check each node
 * @returns prop node if found
 */
export function traverseUpProp(
  node: TSESTree.Node,
  predicate: (node: TSESTree.JSXAttribute) => boolean = F.constTrue,
): O.Option<TSESTree.JSXAttribute> {
  const guard = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
    return node.type === AST_NODE_TYPES.JSXAttribute && predicate(node);
  };

  return AST.traverseUpGuard(node, guard);
}
