import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

export const isJSXElement = (node: TSESTree.Node): node is TSESTree.JSXElement => {
    return node.type === AST_NODE_TYPES.JSXElement;
};

export const isJSXFragment = (node: TSESTree.Node): node is TSESTree.JSXFragment => {
    return node.type === AST_NODE_TYPES.JSXFragment;
};

export const hasChildren = (node: TSESTree.JSXElement | TSESTree.JSXFragment): boolean => {
    return node.children.length > 0;
};
