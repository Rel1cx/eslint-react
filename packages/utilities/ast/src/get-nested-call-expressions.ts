import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { isFunction } from "./is";
import { traverseUpGuard } from "./traverse-up-guard";
import { NodeType } from "./types";

export function getNestedCallExpressions(node: TSESTree.Node): readonly TSESTree.CallExpression[] {
  const callExpressions: TSESTree.CallExpression[] = [];
  const functionNode = O.getOrNull(traverseUpGuard(node, isFunction));
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== NodeType.CallExpression) return;
      const parentFunction = O.getOrNull(traverseUpGuard(node, isFunction));
      if (parentFunction && parentFunction !== functionNode) return;
      callExpressions.push(node);
    },
  });
  return callExpressions;
}
