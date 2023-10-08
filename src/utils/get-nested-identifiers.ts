import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/types";
import memo from "micro-memoize";

export const getNestedIdentifiers = memo((node: TSESTree.Node): TSESTree.Identifier[] => {
    const identifiers: TSESTree.Identifier[] = [];

    if (node.type === N.Identifier) {
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

    if (node.type === N.Property) {
        identifiers.push(...getNestedIdentifiers(node.value));
    }

    if (node.type === N.SpreadElement) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === N.MemberExpression) {
        identifiers.push(...getNestedIdentifiers(node.object));
    }

    if (node.type === N.UnaryExpression) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === N.ChainExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    if (node.type === N.TSNonNullExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    return identifiers;
});
