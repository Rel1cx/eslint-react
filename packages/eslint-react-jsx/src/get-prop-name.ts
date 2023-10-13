import { is, NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

/**
 * Get the name of a JSX attribute
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropName(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(is(NodeType.JSXIdentifier), (n) => n.name)
        .when(is(NodeType.JSXNamespacedName), (n) => n.name.name)
        .exhaustive();
}

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropNameWithNamespace(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(is(NodeType.JSXIdentifier), (n) => n.name)
        .when(is(NodeType.JSXNamespacedName), (n) => `${n.namespace.name}:${n.name.name}`)
        .exhaustive();
}
