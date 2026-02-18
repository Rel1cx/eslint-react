import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isOneOf } from "./node-is";

export function isMultiLine(node: TSESTree.Node) {
  return node.loc.start.line !== node.loc.end.line;
}

export function isLineBreak(node: TSESTree.Node) {
  return isOneOf([AST.Literal, AST.JSXText])(node)
    && typeof node.value === "string"
    && node.value.trim() === ""
    && isMultiLine(node);
}
