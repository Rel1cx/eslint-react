import { is, isStringLiteral, NodeType, traverseUpGuard } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit } from "@eslint-react/variable";
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

/**
 * Traverses up prop node
 * @param node node to traverse up from
 * @param predicate predicate to match prop node
 * @returns prop node if found
 */
export function traverseUpProp(
    node: TSESTree.Node,
    predicate: (node: TSESTree.JSXAttribute) => boolean = F.constTrue,
): O.Option<TSESTree.JSXAttribute> {
    const matcher = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
        return node.type === NodeType.JSXAttribute && predicate(node);
    };

    return O.fromNullable(traverseUpGuard(node, matcher));
}

/**
 * Checks if the node is inside a prop's value
 * @param node node to check
 * @returns true if the node is inside a prop's value
 */
export function isInsidePropValue(node: TSESTree.Node): boolean {
    if (isStringLiteral(node)) {
        return node.parent.type === NodeType.JSXAttribute;
    }

    return O.isSome(traverseUpProp(node, n => n.value?.type === NodeType.JSXExpressionContainer));
}

/**
 * @param properties The properties to search in
 * @param context The rule context
 * @param seenProps The properties that have already been seen
 * @returns A function that searches for a property in the given properties
 */
export function findPropInProperties(
    properties: (TSESTree.Property | TSESTree.RestElement)[] | TSESTree.ObjectLiteralElement[],
    context: RuleContext,
    seenProps: string[] = [],
) {
    /**
     * Search for a property in the given properties
     * @param propName The name of the property to search for
     * @returns The property if found
     */
    return (propName: string): O.Option<(typeof properties)[number]> => {
        return O.fromNullable(
            properties.find((prop) => {
                if (prop.type === NodeType.Property) {
                    return "name" in prop.key && prop.key.name === propName;
                }

                if (prop.type === NodeType.SpreadElement) {
                    if (!("argument" in prop && "name" in prop.argument)) {
                        return false;
                    }

                    const { name } = prop.argument;
                    const maybeFirstDefNodeInit = F.pipe(
                        findVariableByNameUpToGlobal(name, context.getScope()),
                        O.flatMap(getVariableNthDefNodeInit(0)),
                    );
                    if (O.isNone(maybeFirstDefNodeInit)) {
                        return false;
                    }

                    const firstDefNodeInit = maybeFirstDefNodeInit.value;
                    if (firstDefNodeInit.type !== NodeType.ObjectExpression) {
                        return false;
                    }

                    if (seenProps.includes(name)) {
                        return false;
                    }

                    return O.isSome(
                        findPropInProperties(firstDefNodeInit.properties, context, [...seenProps, name])(propName),
                    );
                }

                return false;
            }),
        );
    };
}

/**
 * @param attributes The attributes to search in
 * @param context The rule context
 * @returns A function that searches for a property in the given attributes
 */
export function findPropInAttributes(
    attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
    context: RuleContext,
) {
    /**
     * Search for a property in the given attributes
     * @param propName The name of the property to search for
     * @returns The property if found
     */
    return (propName: string) => {
        return O.fromNullable(
            attributes.find((attr) => {
                return match(attr)
                    .when(is(NodeType.JSXAttribute), (attr) => getPropName(attr) === propName)
                    .when(is(NodeType.JSXSpreadAttribute), (attr) => {
                        if (!("argument" in attr && "name" in attr.argument)) {
                            return false;
                        }

                        const { name } = attr.argument;
                        const maybeFirstDefNodeInit = F.pipe(
                            findVariableByNameUpToGlobal(name, context.getScope()),
                            O.flatMap(getVariableNthDefNodeInit(0)),
                        );
                        if (O.isNone(maybeFirstDefNodeInit)) {
                            return false;
                        }

                        if (!("properties" in maybeFirstDefNodeInit.value)) {
                            return false;
                        }

                        return O.isSome(
                            findPropInProperties(maybeFirstDefNodeInit.value.properties, context)(propName),
                        );
                    })
                    .otherwise(F.constFalse);
            }),
        );
    };
}
