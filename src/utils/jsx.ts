import { AST_NODE_TYPES, TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { F, I } from "../lib/primitives/data";
import { AST } from "./ast";
import { isCreateElement } from "./is-create-element";

export const isJSXElement = AST.is(AST_NODE_TYPES.JSXElement);

export const isJSXFragment = AST.is(AST_NODE_TYPES.JSXFragment);

export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment): boolean {
    return node.children.length > 0;
}

export function getPropName(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .with({ type: AST_NODE_TYPES.JSXIdentifier }, (n) => n.name)
        .with({ type: AST_NODE_TYPES.JSXNamespacedName }, (n) => n.name.name)
        .exhaustive();
}

type PropCheckingOptions = {
    ignoreCase?: boolean;
    spreadStrict?: boolean;
};

export function hasProp(
    nodeProps: TSESTree.JSXAttribute[],
    { ignoreCase = false, spreadStrict = true }: PropCheckingOptions,
) {
    return (prop: string) => {
        const propToCheck = ignoreCase ? prop.toUpperCase() : prop;

        return nodeProps.some((attribute) => {
            if (I.isNullable(attribute)) {
                return false;
            }

            if (AST.is(AST_NODE_TYPES.JSXSpreadAttribute)(attribute)) {
                return !spreadStrict;
            }

            const currentProp = getPropName(attribute);

            if (ignoreCase) {
                return currentProp.toUpperCase() === propToCheck;
            }

            return propToCheck === currentProp;
        });
    };
}

export function hasAnyProp(nodeProps: TSESTree.JSXAttribute[] = [], options: PropCheckingOptions) {
    return (props: string[]) => props.some(hasProp(nodeProps, options));
}

export function hasEveryProp(nodeProps: TSESTree.JSXAttribute[] = [], options: PropCheckingOptions) {
    return (props: string[]) => props.every(hasProp(nodeProps, options));
}

export function isJSXValue(
    node: TSESTree.Node | null,
    context: TSESLint.RuleContext<string, []>,
    strict: boolean,
    ignoreNull: boolean,
): boolean {
    if (!node) {
        return false;
    }

    return (
        match(node.type)
            .with(AST_NODE_TYPES.JSXElement, F.constTrue)
            .with(AST_NODE_TYPES.JSXFragment, F.constTrue)
            .with(AST_NODE_TYPES.Literal, () => {
                if (!("value" in node) || ignoreNull) {
                    return false;
                }

                return node.value === null;
            })
            .with(AST_NODE_TYPES.ConditionalExpression, () => {
                if (!("consequent" in node)) {
                    return false;
                }

                const leftHasJSX = match(node.consequent)
                    .with(P.array(), (n) => {
                        return n.some((n) => isJSXValue(n, context, strict, ignoreNull));
                    })
                    .with(P.any, (n) => {
                        return isJSXValue(n, context, strict, ignoreNull);
                    })
                    .exhaustive();

                return leftHasJSX || ("alternate" in node && isJSXValue(node.alternate, context, strict, ignoreNull));
            })
            .with(AST_NODE_TYPES.LogicalExpression, () => {
                if (!("left" in node)) {
                    return false;
                }

                return (
                    isJSXValue(node.left, context, strict, ignoreNull) ||
                    isJSXValue(node.right, context, strict, ignoreNull)
                );
            })
            .with(AST_NODE_TYPES.SequenceExpression, () => {
                if (!("expressions" in node)) {
                    return false;
                }

                const exp = node.expressions.at(-1);

                return !I.isNullable(exp) && isJSXValue(exp, context, strict, ignoreNull);
            })
            .with(AST_NODE_TYPES.CallExpression, () => {
                return isCreateElement(node, context);
            })
            // TODO: Implement the rest of the cases
            // ...
            .otherwise(F.constFalse)
    );
}
