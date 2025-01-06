import * as AST from "@eslint-react/ast";
import type { O } from "@eslint-react/eff";
import { F } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function findParentProp(
  node: TSESTree.Node,
  predicate: (node: TSESTree.JSXAttribute) => boolean = F.constTrue,
): O.Option<TSESTree.JSXAttribute> {
  const guard = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
    return node.type === T.JSXAttribute && predicate(node);
  };

  return AST.findParentNodeGuard(node, guard);
}
