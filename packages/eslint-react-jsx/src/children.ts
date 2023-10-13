import type { TSESTree } from "@typescript-eslint/types";

export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    return node.children.length > 0;
}
