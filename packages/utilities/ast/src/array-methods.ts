import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

const indexParamPosition = new Map<string, number>([
  ["every", 1],
  ["filter", 1],
  ["find", 1],
  ["findIndex", 1],
  ["findLast", 1],
  ["findLastIndex", 1],
  ["flatMap", 1],
  ["forEach", 1],
  ["map", 1],
  ["reduce", 2],
  ["reduceRight", 2],
  ["some", 1],
]);

export function getArrayMethodIndexParamPosition(methodName: string) {
  return indexParamPosition.get(methodName) ?? -1;
}

export function isArrayMapCall(node: TSESTree.Node): node is TSESTree.CallExpression {
  if (node.type !== T.CallExpression) return false;
  if (node.callee.type !== T.MemberExpression) return false;
  if (node.callee.property.type !== T.Identifier) return false;
  const { name } = node.callee.property;
  return name === "map" || name.endsWith("Map");
}
