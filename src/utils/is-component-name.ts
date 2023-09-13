import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { AST } from "./ast";

export function isComponentName(name: string) {
    // eslint-disable-next-line require-unicode-regexp
    return /^[A-Z_]/.test(name);
}

export function isComponentNameNode(node: TSESTree.Node) {
    return AST.is(AST_NODE_TYPES.Identifier)(node) && isComponentName(node.name);
}
