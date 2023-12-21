import { NodeType, traverseUpGuard } from "@eslint-react/ast";
import { F, type O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

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
    return node.type === NodeType.JSXAttribute && predicate(node);
  };

  return traverseUpGuard(node, guard);
}
