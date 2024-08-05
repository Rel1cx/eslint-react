import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { isFunction } from "./is";
import { traverseUpGuard } from "./traverse-up-guard";
import { NodeType } from "./types";

/**
 * Gets the nested identifiers in the node that are within the same function (if has one)
 * @param node The AST node
 * @returns The nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  const functionNode = O.getOrNull(traverseUpGuard(node, isFunction));
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== NodeType.Identifier) return;
      const parentFunction = O.getOrNull(traverseUpGuard(node, isFunction));
      if (parentFunction && parentFunction !== functionNode) return;
      identifiers.push(node);
    },
  });
  return identifiers;
}
