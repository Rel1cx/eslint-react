import type { Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule } from "../../tools/create-rule";
import type { Cond } from "../../typings";
import * as AST from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";
import type { ESFunction } from "../utils/node";

export const RULE_NAME = "prefer-destructuring-assignment";

type MessageID =
    | "NO_DESTRUCTOR_CONTEXT"
    | "NO_DESTRUCTOR_PROPS"
    | "NO_DESTRUCTURING_ASSIGNMENT"
    | "USE_DESTRUCTURING_ASSIGNMENT";

type Options = readonly [Cond];

const schema = [
    {
        type: "string",
        enum: ["always", "never"],
    },
] satisfies [JSONSchema4];

const defaultOptions = ["always"] as const satisfies Options;

type MemberExpressionWithObjectName = TSESTree.MemberExpression & { object: TSESTree.Identifier };

function isMemberExpressionWithObjectName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
    return AST.is(N.Identifier)(node.object) && "name" in node.object;
}

export default createRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce using destructuring assignment in component props and context",
        },
        schema,
        messages: {
            NO_DESTRUCTOR_CONTEXT: "Use destructuring assignment for context",
            NO_DESTRUCTOR_PROPS: "Use destructuring assignment for props",
            NO_DESTRUCTURING_ASSIGNMENT: "Use destructuring assignment for {{type}}",
            USE_DESTRUCTURING_ASSIGNMENT: "Use destructuring assignment",
        },
    },
    defaultOptions,
    create(context) {
        const [cond = "always"] = context.options;

        const { ctx, listeners } = ComponentCollector.make(context);
        const variableDeclarators: [Scope, TSESTree.VariableDeclarator][] = [];
        const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

        return {
            ...listeners,
            MemberExpression(node) {
                if (isMemberExpressionWithObjectName(node)) {
                    memberExpressionWithNames.push([context.getScope(), node]);
                }
            },
            VariableDeclarator(node) {
                variableDeclarators.push([context.getScope(), node]);
            },
            // eslint-disable-next-line perfectionist/sort-objects, sonarjs/cognitive-complexity
            "Program:exit"() {
                const components = ctx.getAllComponents();

                function isFunctionComponent(block: TSESTree.Node): block is ESFunction {
                    return AST.isPossibleNamedReactComponent(block) && components.includes(block);
                }

                if (cond === "always") {
                    // eslint-disable-next-line prefer-const
                    for (let [scope, memberExpression] of memberExpressionWithNames) {
                        let isComponent = isFunctionComponent(scope.block);
                        while (!isComponent && scope.upper && scope.upper !== scope) {
                            isComponent = isFunctionComponent(scope.upper.block);
                            scope = scope.upper;
                        }

                        if (!isComponent) {
                            continue;
                        }

                        const component = scope.block;

                        if (!("params" in component)) {
                            continue;
                        }

                        const [props, ctx] = component.params;
                        if (props && "name" in props && props.name && memberExpression.object.name === props.name) {
                            context.report({
                                messageId: "USE_DESTRUCTURING_ASSIGNMENT",
                                node: memberExpression,
                            });
                        }

                        if (ctx && "name" in ctx && ctx.name && memberExpression.object.name === ctx.name) {
                            context.report({
                                messageId: "USE_DESTRUCTURING_ASSIGNMENT",
                                node: memberExpression,
                            });
                        }
                    }

                    return;
                }

                for (const component of components) {
                    const [props, ctx] = component.params;

                    if (props && AST.isDestructorParameter(props)) {
                        context.report({
                            messageId: "NO_DESTRUCTOR_PROPS",
                            node: component,
                        });

                        continue;
                    }

                    if (ctx && AST.isDestructorParameter(ctx)) {
                        context.report({
                            messageId: "NO_DESTRUCTOR_CONTEXT",
                            node: component,
                        });
                    }
                }

                for (const [scope, declarator] of variableDeclarators) {
                    const isComponent = AST.isFunction(scope.block) && components.includes(scope.block);
                    const isDestructuring = declarator.init && AST.is(N.ObjectPattern)(declarator.id);
                    if (!("init" in declarator && declarator.init && "name" in declarator.init)) {
                        continue;
                    }

                    const isDestructuringSFC = isDestructuring && ["context", "props"].includes(declarator.init.name);
                    if (isComponent && isDestructuringSFC) {
                        context.report({
                            data: {
                                type: declarator.init.name,
                            },
                            messageId: "NO_DESTRUCTURING_ASSIGNMENT",
                            node: declarator,
                        });
                    }
                }
            },
        };
    },
});
