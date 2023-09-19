import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import birecord from "birecord";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { I } from "../lib/primitives/data";
import { AST } from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";

const RULE_NAME: RuleName = "no-unstable-default-props";

type MessageID = "UNSTABLE_DEFAULT_PROP";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

const FORBIDDEN_TYPES = birecord({
    [AST_NODE_TYPES.ArrayExpression]: "array literal",
    [AST_NODE_TYPES.ArrowFunctionExpression]: "arrow function",
    [AST_NODE_TYPES.ClassExpression]: "class expression",
    [AST_NODE_TYPES.FunctionExpression]: "function expression",
    [AST_NODE_TYPES.JSXElement]: "JSX element",
    [AST_NODE_TYPES.NewExpression]: "new expression",
    [AST_NODE_TYPES.ObjectExpression]: "object literal",
});

function hasUsedObjectDestructuringSyntax(
    params: TSESTree.FunctionExpression["params"],
): params is [TSESTree.ObjectPattern] {
    if (params.length !== 1) {
        return false;
    }

    const [param] = params;

    return !I.isNullable(param) && AST.is(AST_NODE_TYPES.ObjectPattern)(param);
}

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of referential-type variables as default param in function component",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            UNSTABLE_DEFAULT_PROP:
                "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable reference instead of {{forbiddenType}}.",
        },
    },
    defaultOptions,
    create(context) {
        const collector = ComponentCollector.make(context);

        return {
            ...collector.listeners,
            "Program:exit"() {
                const components = collector.getComponents();

                for (const component of components) {
                    const { params } = component;

                    if (!hasUsedObjectDestructuringSyntax(params)) {
                        continue;
                    }

                    const { properties } = params[0];

                    for (const prop of properties) {
                        if (
                            !AST.is(AST_NODE_TYPES.Property)(prop)
                            || !AST.is(AST_NODE_TYPES.AssignmentPattern)(prop.value)
                        ) {
                            continue;
                        }

                        const propKey = prop.key;
                        const propDefaultValue = prop.value;
                        const propDefaultValueRight = propDefaultValue.right;

                        if (
                            AST.is(AST_NODE_TYPES.Literal)(propDefaultValueRight)
                            && "regex" in propDefaultValueRight
                            && !I.isNullable(propDefaultValueRight.regex)
                        ) {
                            context.report({
                                data: {
                                    forbiddenType: "regex literal",
                                },
                                messageId: "UNSTABLE_DEFAULT_PROP",
                                node: propKey,
                            });

                            continue;
                        }

                        if (
                            AST.is(AST_NODE_TYPES.CallExpression)(propDefaultValueRight)
                            && "callee" in propDefaultValueRight
                            && AST.is(AST_NODE_TYPES.Identifier)(propDefaultValueRight.callee)
                            && propDefaultValueRight.callee.name === "Symbol"
                        ) {
                            context.report({
                                data: {
                                    forbiddenType: "Symbol literal",
                                },
                                messageId: "UNSTABLE_DEFAULT_PROP",
                                node: propKey,
                            });

                            continue;
                        }

                        if (!FORBIDDEN_TYPES.has(propDefaultValueRight.type)) {
                            continue;
                        }

                        const forbiddenType = FORBIDDEN_TYPES.get(propDefaultValueRight.type);

                        context.report({
                            data: {
                                forbiddenType,
                            },
                            messageId: "UNSTABLE_DEFAULT_PROP",
                            node: propKey,
                        });
                    }
                }
            },
        };
    },
});
