import type { TSESTree } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings/rule-context";
import { E, F, I, MutList, O } from "../lib/primitives/data";
import type { FunctionNode } from "./ast";
import { isComponentName } from "./is-component-name";
import { isJSXValue, isReturnStatementReturningJSX } from "./jsx";

export function make(context: RuleContext) {
    const components = new Set<FunctionNode>();

    const functionStack = MutList.make<FunctionNode>();

    const getComponents = () => components;

    const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));

    const onFunctionEnter = (node: FunctionNode) => MutList.append(functionStack, node);

    const onFunctionExit = () => MutList.pop(functionStack);

    const listeners = {
        ArrowFunctionExpression: onFunctionEnter,
        "ArrowFunctionExpression:exit": onFunctionExit,
        FunctionDeclaration: onFunctionEnter,
        "FunctionDeclaration:exit": onFunctionExit,
        FunctionExpression: onFunctionEnter,
        "FunctionExpression:exit": onFunctionExit,
        ReturnStatement(node: TSESTree.ReturnStatement) {
            const hasJsx = isReturnStatementReturningJSX(node, context);

            if (!hasJsx || MutList.isEmpty(functionStack)) {
                return;
            }

            F.pipe(
                getCurrentFunction(),
                O.map((currentFn) => components.add(currentFn)),
                E.fromOption(() => "Unexpected empty function stack"),
                E.mapLeft(console.warn),
            );
        },
        // eslint-disable-next-line perfectionist/sort-objects
        "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
            const { body } = node;

            const hasJsx = isJSXValue(body, context, false, false);

            if (!hasJsx || MutList.isEmpty(functionStack)) {
                return;
            }

            F.pipe(
                getCurrentFunction(),
                O.map((currentFn) => {
                    const { parent } = currentFn;

                    if ("id" in parent && !I.isNullable(parent.id) && "name" in parent.id) {
                        const { name } = parent.id;

                        if (!isComponentName(name)) {
                            return;
                        }
                    }

                    components.add(currentFn);
                }),
                E.fromOption(() => "Unexpected empty function stack"),
                E.mapLeft(console.warn),
            );
        },
    } as const;

    return {
        getComponents,
        getCurrentFunction,
        listeners,
    } as const;
}
