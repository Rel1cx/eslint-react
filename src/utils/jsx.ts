import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { I } from "../lib/primitives/data";
import { AST } from "./ast";

type HasPropOptions = {
    ignoreCase?: boolean;
    spreadStrict?: boolean;
};

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

export default function hasProp(
    nodeProps: TSESTree.JSXAttribute[],
    { ignoreCase = false, spreadStrict = true }: HasPropOptions = {},
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

export function hasAnyProp(nodeProps: TSESTree.JSXAttribute[] = [], options: HasPropOptions = {}) {
    return (props: string | string[]) => {
        const propsToCheck = I.isString(props) ? props.split(" ") : props;

        return propsToCheck.some(hasProp(nodeProps, options));
    };
}

export function hasEveryProp(nodeProps: TSESTree.JSXAttribute[] = [], options: HasPropOptions = {}) {
    return (props: string | string[]) => {
        const propsToCheck = I.isString(props) ? props.split(" ") : props;

        return propsToCheck.every(hasProp(nodeProps, options));
    };
}
