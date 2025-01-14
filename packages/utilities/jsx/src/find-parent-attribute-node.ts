import * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import { returnTrue } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function findParentAttributeNode(
  node: TSESTree.Node,
  test: (node: TSESTree.JSXAttribute) => boolean = returnTrue,
): TSESTree.JSXAttribute | _ {
  const guard = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
    return node.type === T.JSXAttribute && test(node);
  };

  return AST.findParentNode(node, guard);
}
