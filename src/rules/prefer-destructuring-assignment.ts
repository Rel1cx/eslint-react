import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { Cond } from "../../typings";
import { AST, type FunctionNode } from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";

const RULE_NAME = "prefer-destructuring-assignment";

type MessageID =
    | "NO_DESTRUCTOR_CONTEXT"
    | "NO_DESTRUCTOR_PROPS"
    | "NO_DESTRUCTURING_ASSIGNMENT"
    | "USE_DESTRUCTURING_ASSIGNMENT";

type Options = readonly [Cond];

const schema = [{
    type: "string",
    enum: [
        "always",
        "never",
    ],
}] satisfies [JSONSchema4];

const defaultOptions = ["always"] as const satisfies Options;

type MemberExpressionWithObjectName = TSESTree.MemberExpression & { object: TSESTree.Identifier };

function isMemberExpressionWithName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
    return AST.is(AST_NODE_TYPES.Identifier)(node.object) && ("name" in node.object);
}

export default createEslintRule<Options, MessageID>({
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

        const collector = ComponentCollector.make(context);
        const variableDeclarators: [Scope, TSESTree.VariableDeclarator][] = [];
        const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

        return {
            ...collector.listeners,
            MemberExpression(node) {
                if (isMemberExpressionWithName(node)) {
                    memberExpressionWithNames.push([context.getScope(), node]);
                }
            },
            VariableDeclarator(node) {
                variableDeclarators.push([context.getScope(), node]);
            },
            // eslint-disable-next-line perfectionist/sort-objects, sonarjs/cognitive-complexity
            "Program:exit"() {
                const components = collector.getComponents();

                function isFunctionComponent(block: TSESTree.Node): block is FunctionNode {
                    return AST.isPossibleNamedReactComponent(block) && components.has(block);
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
                    const isComponent = AST.isFunctionNode(scope.block) && components.has(scope.block);
                    const isDestructuring = declarator.init && AST.is(AST_NODE_TYPES.ObjectPattern)(declarator.id);

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
