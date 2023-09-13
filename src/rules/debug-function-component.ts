import type { TSESTree } from "@typescript-eslint/types";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { type RuleName } from "../../typings";
import { I, MutList, MutRef, O } from "../lib/primitives/data";
import { AST, type FunctionNode } from "../utils/ast";
import { isComponentName } from "../utils/is-component-name";
import { isJSXValue, isReturningJSX } from "../utils/jsx";

const RULE_NAME: RuleName = "debug-function-component";

type MessageID = "FUNCTION_COMPONENT" | "POSSIBLE_FUNCTION_COMPONENT";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

const count = MutRef.make(0);

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "debug report all function components",
        },
        schema: [],
        messages: {
            FUNCTION_COMPONENT: "function component found ({{count}})",
            // eslint-disable-next-line eslint-plugin/no-unused-message-ids
            POSSIBLE_FUNCTION_COMPONENT: "possible function component found ({{count}})",
        },
    },
    defaultOptions,
    create(context) {
        const components = new Set<FunctionNode>();

        const functionStack = MutList.make<FunctionNode>();

        const onFunctionEnter = (node: FunctionNode) => MutList.append(functionStack, node);

        const onFunctionExit = () => MutList.pop(functionStack);

        return {
            ArrowFunctionExpression: onFunctionEnter,
            "ArrowFunctionExpression:exit": onFunctionExit,
            FunctionDeclaration: onFunctionEnter,
            "FunctionDeclaration:exit": onFunctionExit,
            FunctionExpression: onFunctionEnter,
            "FunctionExpression:exit": onFunctionExit,
            ReturnStatement(node) {
                const returnStatements = AST.getNestedReturnStatements(node);

                const hasJsx = returnStatements.some((returnStatement) => isReturningJSX(returnStatement, context));

                if (!hasJsx || MutList.isEmpty(functionStack)) {
                    return;
                }

                const currentFn = MutList.tail(functionStack);

                if (!currentFn) {
                    console.warn("Unexpected empty function stack");
                    return;
                }

                components.add(currentFn);
            },
            // eslint-disable-next-line perfectionist/sort-objects
            "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
                const { body } = node;

                const hasJsx = isJSXValue(body, context, false, false);

                if (!hasJsx || MutList.isEmpty(functionStack)) {
                    return;
                }

                const currentFn = MutList.tail(functionStack);

                if (!currentFn) {
                    console.warn("Unexpected empty function stack");
                    return;
                }

                const { parent } = currentFn;

                if ("id" in parent && !I.isNullable(parent.id) && "name" in parent.id) {
                    const { name } = parent.id;

                    if (!isComponentName(name)) {
                        return;
                    }
                }

                components.add(currentFn);
            },
            "Program:exit"() {
                for (const component of components) {
                    const maybeName = O.fromNullable(component.id?.name);

                    if (O.isSome(maybeName) && !isComponentName(maybeName.value)) {
                        return;
                    }

                    context.report({
                        data: {
                            count: MutRef.incrementAndGet(count),
                        },
                        messageId: "FUNCTION_COMPONENT",
                        node: component,
                    });
                }
            },
        };
    },
});
