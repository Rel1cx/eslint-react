import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import memo from "micro-memoize";
import { match, P } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { F, O } from "../lib";
import { isWhiteSpace } from "../lib/is-white-space";
import { traverseUpGuard } from "./ast-traverse";
import * as AST from "./ast-types";
import { getNestedReturnStatements } from "./get-nested-return-statements";
import { isCreateElement } from "./is-create-element";
import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit } from "./variable";

export const isJSXFileExt = (ext: string): ext is ".jsx" | ".tsx" => ext === ".jsx" || ext === ".tsx";

/**
 * Check if a Literal or JSXText node is a line break
 * @param node The node to check
 * @returns boolean
 */
export function isLineBreak(node: TSESTree.Node) {
    const isLiteral = AST.isOneOf([N.Literal, N.JSXText])(node);
    if (!("value" in node) || !isString(node.value)) {
        return false;
    }

    const isMultiline = node.loc.start.line !== node.loc.end.line;

    return isLiteral && isMultiline && isWhiteSpace(node.value);
}

export const isJsxTagNameExpression = AST.isOneOf([
    N.JSXIdentifier,
    N.JSXMemberExpression,
    N.JSXNamespacedName,
]);

export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    return node.children.length > 0;
}

export const isJSXValue = memo(
    /**
     * Check if a node is a JSX value
     * @param node Node to check
     * @param context Rule context
     * @param strict Whether to check all branches of the conditional expression
     * @param ignoreNull Whether to ignore null values
     * @returns boolean
     */
    (node: TSESTree.Node | null | undefined, context: RuleContext, strict: boolean, ignoreNull: boolean): boolean => {
        if (!node) {
            return false;
        }

        return match(node.type)
            .with(N.JSXElement, F.constTrue)
            .with(N.JSXFragment, F.constTrue)
            .with(N.Literal, () => {
                if (!("value" in node) || ignoreNull) {
                    return false;
                }

                return node.value === null;
            })
            .with(N.ConditionalExpression, () => {
                if (!("consequent" in node)) {
                    return false;
                }

                const leftHasJSX = match(node.consequent)
                    .with(P.array(), (n) => n.some((n) => isJSXValue(n, context, strict, ignoreNull)))
                    .with(P.any, (n) => isJSXValue(n, context, strict, ignoreNull))
                    .exhaustive();

                if (leftHasJSX) {
                    return true;
                }

                return "alternate" in node && isJSXValue(node.alternate, context, strict, ignoreNull);
            })
            .with(N.LogicalExpression, () => {
                if (!("left" in node)) {
                    return false;
                }

                return (
                    isJSXValue(node.left, context, strict, ignoreNull)
                    || isJSXValue(node.right, context, strict, ignoreNull)
                );
            })
            .with(N.SequenceExpression, () => {
                if (!("expressions" in node)) {
                    return false;
                }
                const exp = node.expressions.at(-1);

                return isJSXValue(exp, context, strict, ignoreNull);
            })
            .with(N.CallExpression, () => isCreateElement(node, context))
            .with(N.Identifier, () => {
                if (!("name" in node)) {
                    return false;
                }
                if (isJsxTagNameExpression(node)) {
                    return true;
                }
                if (!isString(node.name) && node.name.type !== N.Identifier) {
                    return isJsxTagNameExpression(node.name);
                }
                const name = match(node.name)
                    .with(P.string, F.identity)
                    .with({ type: N.Identifier }, (n) => n.name)
                    .exhaustive();
                const variable = findVariableByNameUpToGlobal(name, context.getScope());

                return F.pipe(
                    variable,
                    O.flatMap(getVariableNthDefNodeInit(0)),
                    O.map(AST.isOneOf([N.JSXElement, N.JSXFragment])),
                    O.getOrElse(F.constFalse),
                );
            })
            .otherwise(F.constFalse);
    },
);

/**
 * Check if function is returning JSX
 * @param node The return statement node to check
 * @param context The rule context
 * @param strict Whether to check all branches of the conditional expression
 * @param ignoreNull Whether to ignore null values
 * @returns boolean
 */
export function isFunctionReturningJSX(
    node: AST.TSESTreeFunction,
    context: RuleContext,
    strict = false,
    ignoreNull = false,
) {
    if (node.body.type !== N.BlockStatement) {
        return isJSXValue(node.body, context, strict, ignoreNull);
    }

    const statements = getNestedReturnStatements(node.body);

    return statements.some((statement) => isJSXValue(statement.argument, context, strict, ignoreNull));
}

/**
 * Get the name of a JSX attribute
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropName(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(AST.is(N.JSXIdentifier), (n) => n.name)
        .when(AST.is(N.JSXNamespacedName), (n) => n.name.name)
        .exhaustive();
}

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropNameWithNamespace(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(AST.is(N.JSXIdentifier), (n) => n.name)
        .when(AST.is(N.JSXNamespacedName), (n) => `${n.namespace.name}:${n.name.name}`)
        .exhaustive();
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
                if (prop.type === N.Property) {
                    return "name" in prop.key && prop.key.name === propName;
                }

                if (prop.type === N.SpreadElement) {
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
                    if (firstDefNodeInit.type !== N.ObjectExpression) {
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
                    .when(AST.is(N.JSXAttribute), (attr) => getPropName(attr) === propName)
                    .when(AST.is(N.JSXSpreadAttribute), (attr) => {
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

export function isDeclaredInJSXAttribute(node: TSESTree.Node) {
    const matcher = (node: TSESTree.Node): node is TSESTree.JSXAttribute => {
        return node.type === N.JSXAttribute
            && node.value?.type === N.JSXExpressionContainer;
    };

    return !!traverseUpGuard(node, matcher);
}
