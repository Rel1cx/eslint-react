import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-types";

/**
 * Determines whether node equals to another node
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export function isNodeEqual(a: TSESTree.Node, b: TSESTree.Node): boolean {
  if (a.type !== b.type) {
    return false;
  }
  if (a.type === NodeType.ThisExpression && b.type === NodeType.ThisExpression) {
    return true;
  }
  if (a.type === NodeType.Literal && b.type === NodeType.Literal) {
    return a.value === b.value;
  }
  if (a.type === NodeType.Identifier && b.type === NodeType.Identifier) {
    return a.name === b.name;
  }
  if (a.type === NodeType.MemberExpression && b.type === NodeType.MemberExpression) {
    return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
  }

  return false;
}
