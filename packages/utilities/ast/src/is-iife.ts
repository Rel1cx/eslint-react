import type { TSESTreeFunction } from "./types";
import { NodeType } from "./types";

export function isIIFE(node: TSESTreeFunction) {
  return true
    && node.type !== NodeType.FunctionDeclaration
    && node.parent.type === NodeType.CallExpression
    && node.parent.callee === node;
}
