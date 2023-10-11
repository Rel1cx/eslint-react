import { type TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-types";

export function getNestedIdentifiers(node: TSESTree.Node): TSESTree.Identifier[] {
    const identifiers: TSESTree.Identifier[] = [];

    if (node.type === NodeType.Identifier) {
        identifiers.push(node);
    }

    if ("arguments" in node) {
        node.arguments.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if ("elements" in node) {
        node.elements.forEach((x) => {
            if (x !== null) {
                identifiers.push(...getNestedIdentifiers(x));
            }
        });
    }

    if ("properties" in node) {
        node.properties.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if ("expressions" in node) {
        node.expressions.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if (node.type === NodeType.Property) {
        identifiers.push(...getNestedIdentifiers(node.value));
    }

    if (node.type === NodeType.SpreadElement) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === NodeType.MemberExpression) {
        identifiers.push(...getNestedIdentifiers(node.object));
    }

    if (node.type === NodeType.UnaryExpression) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === NodeType.ChainExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    if (node.type === NodeType.TSNonNullExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    return identifiers;
}
