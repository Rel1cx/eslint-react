import { isDestructuringPattern, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector, isValidReactComponentName } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { Cond } from "@eslint-react/types";
import type { Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

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
    return node.object.type === NodeType.Identifier && "name" in node.object;
}

export default createRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce using destructuring assignment in component props and context",
            recommended: "recommended",
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
        const { ctx, listeners } = componentCollector(context);
        const variableDeclarators: [Scope, TSESTree.VariableDeclarator][] = [];
        const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

        return {
            ...listeners,
            MemberExpression(node) {
                if (isMemberExpressionWithObjectName(node)) {
                    memberExpressionWithNames.push([context.getScope(), node]);
                }
            },
            // eslint-disable-next-line sonarjs/cognitive-complexity
            "Program:exit"() {
                const maybeComponents = ctx.getAllComponents();
                if (E.isLeft(maybeComponents)) {
                    console.error(maybeComponents.left);

                    return;
                }

                const components = maybeComponents.right;
                function isFunctionComponent(block: TSESTree.Node): block is TSESTreeFunction {
                    return isFunction(block) && isValidReactComponentName(block.id?.name) && components.includes(block);
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
                        if (isMatching({ name: memberExpression.object.name }, props)) {
                            context.report({
                                messageId: "USE_DESTRUCTURING_ASSIGNMENT",
                                node: memberExpression,
                            });
                        }
                        if (isMatching({ name: memberExpression.object.name }, ctx)) {
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
                    if (props && isDestructuringPattern(props)) {
                        context.report({
                            messageId: "NO_DESTRUCTOR_PROPS",
                            node: component,
                        });

                        continue;
                    }

                    if (ctx && isDestructuringPattern(ctx)) {
                        context.report({
                            messageId: "NO_DESTRUCTOR_CONTEXT",
                            node: component,
                        });
                    }
                }
                for (const [scope, declarator] of variableDeclarators) {
                    const isComponent = isFunction(scope.block) && components.includes(scope.block);
                    const isDestructuring = declarator.init && declarator.id.type === NodeType.ObjectPattern;

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
            VariableDeclarator(node) {
                variableDeclarators.push([context.getScope(), node]);
            },
        };
    },
});
