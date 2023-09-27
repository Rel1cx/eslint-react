import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/utils";
import memo from "micro-memoize";
import { match, P } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { F, isNil, isString, O } from "../lib/primitives";
import * as AST from "./ast";
import { isCreateElement } from "./is-create-element";
import { isWhiteSpace } from "./string";
import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit } from "./variable";

export const isJSXElement = AST.is(N.JSXElement);

export const isJSXFragment = AST.is(N.JSXFragment);

export const isJSX = (node: TSESTree.Node): node is TSESTree.JSXElement | TSESTree.JSXFragment => {
    return isJSXElement(node) || isJSXFragment(node);
};

export const isJsxTagNameExpression = AST.isOneOf([
    N.JSXIdentifier,
    N.JSXMemberExpression,
    N.JSXNamespacedName,
]);

export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment): boolean {
    return node.children.length > 0;
}

export const isJSXValue = memo(
    (node: TSESTree.Node | null, context: RuleContext, strict: boolean, ignoreNull: boolean): boolean => {
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

                return leftHasJSX || ("alternate" in node && isJSXValue(node.alternate, context, strict, ignoreNull));
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

                return !isNil(exp) && isJSXValue(exp, context, strict, ignoreNull);
            })
            .with(N.CallExpression, () => isCreateElement(node, context))
            .with(N.Identifier, () => {
                if (!("name" in node)) {
                    return false;
                }
                if (isJsxTagNameExpression(node)) {
                    return true;
                }
                if (!isString(node.name) && !AST.is(N.Identifier)(node.name)) {
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

export function isReturnStatementReturningJSX(
    node: TSESTree.ReturnStatement,
    context: RuleContext,
    strict = false,
    ignoreNull = false,
) {
    const statements = AST.getNestedReturnStatements(node);

    return statements.some((statement) => isJSXValue(statement.argument, context, strict, ignoreNull));
}

export function getPropName(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(AST.is(N.JSXIdentifier), (n) => n.name)
        .when(AST.is(N.JSXNamespacedName), (n) => n.name.name)
        .exhaustive();
}

export function getPropNameWithNamespace(node: TSESTree.JSXAttribute) {
    return match(node.name)
        .when(AST.is(N.JSXIdentifier), (n) => n.name)
        .when(AST.is(N.JSXNamespacedName), (n) => `${n.namespace.name}:${n.name.name}`)
        .exhaustive();
}

export function findPropInProperties(
    properties: (TSESTree.Property | TSESTree.RestElement)[] | TSESTree.ObjectLiteralElement[],
    context: RuleContext,
    seenProps: string[] = [],
) {
    return (propName: string): O.Option<(typeof properties)[number]> => {
        return O.fromNullable(
            properties.find((prop) => {
                if (AST.is(N.Property)(prop)) {
                    return "name" in prop.key && prop.key.name === propName;
                }

                if (AST.is(N.SpreadElement)(prop)) {
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
                    if (!AST.is(N.ObjectExpression)(firstDefNodeInit)) {
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

export function findPropInAttributes(
    attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
    context: RuleContext,
) {
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

export function isLineBreak(node: TSESTree.Node): boolean {
    const isLiteral = AST.isOneOf([N.Literal, N.JSXText])(node);
    if (!("value" in node) || !isString(node.value)) {
        return false;
    }

    const isMultiline = node.loc.start.line !== node.loc.end.line;

    return isLiteral && isMultiline && isWhiteSpace(node.value);
}
