import type { TSESTreeFunction } from "./types";
import { NodeType } from "./types";

export function isIIFE(node: TSESTreeFunction) {
  if (node.type === NodeType.FunctionDeclaration) return false;
  return node.parent.type === NodeType.CallExpression && node.parent.callee === node;
}
