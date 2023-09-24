import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import birecord from "birecord";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { I } from "../lib/primitives";
import { AST } from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";

export const RULE_NAME = "no-unstable-default-props";

type MessageID = "INVALID";

const FORBIDDEN_TYPES = birecord({
    [N.ArrayExpression]: "array literal",
    [N.ArrowFunctionExpression]: "arrow function",
    [N.ClassExpression]: "class expression",
    [N.FunctionExpression]: "function expression",
    [N.JSXElement]: "JSX element",
    [N.NewExpression]: "new expression",
    [N.ObjectExpression]: "object literal",
});

function hasUsedObjectDestructuringSyntax(
    params: TSESTree.FunctionExpression["params"],
): params is [TSESTree.ObjectPattern] {
    if (params.length !== 1) {
        return false;
    }
    const [param] = params;

    return !I.isNullable(param) && AST.is(N.ObjectPattern)(param);
}

export default createEslintRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of referential-type variables as default param in function component",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID:
                "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable reference instead of {{forbiddenType}}.",
        },
    },
    defaultOptions: [],
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

                    const [{ properties }] = params;
                    for (const prop of properties) {
                        if (
                            !AST.is(N.Property)(prop)
                            || !AST.is(N.AssignmentPattern)(prop.value)
                        ) {
                            continue;
                        }

                        const propKey = prop.key;
                        const propDefaultValue = prop.value;
                        const propDefaultValueRight = propDefaultValue.right;
                        if (
                            AST.is(N.Literal)(propDefaultValueRight)
                            && "regex" in propDefaultValueRight
                            && !I.isNullable(propDefaultValueRight.regex)
                        ) {
                            context.report({
                                data: {
                                    forbiddenType: "regex literal",
                                },
                                messageId: "INVALID",
                                node: propKey,
                            });

                            continue;
                        }
                        if (
                            AST.is(N.CallExpression)(propDefaultValueRight)
                            && "callee" in propDefaultValueRight
                            && AST.is(N.Identifier)(propDefaultValueRight.callee)
                            && propDefaultValueRight.callee.name === "Symbol"
                        ) {
                            context.report({
                                data: {
                                    forbiddenType: "Symbol literal",
                                },
                                messageId: "INVALID",
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
                            messageId: "INVALID",
                            node: propKey,
                        });
                    }
                }
            },
        };
    },
});
