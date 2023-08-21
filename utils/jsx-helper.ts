import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

export function isJSXElement(node: TSESTree.Node): node is TSESTree.JSXElement {
    return node.type === AST_NODE_TYPES.JSXElement;
}

export function isJSXFragment(node: TSESTree.Node): node is TSESTree.JSXFragment {
    return node.type === AST_NODE_TYPES.JSXFragment;
}

export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment): boolean {
    return node.children.length > 0;
}

export function getPropKey(name: TSESTree.JSXIdentifier | TSESTree.JSXNamespacedName): string {
    return match(name)
        .with({ type: AST_NODE_TYPES.JSXIdentifier }, (n) => n.name)
        .with({ type: AST_NODE_TYPES.JSXNamespacedName }, (n) => n.name.name)
        .exhaustive();
}
