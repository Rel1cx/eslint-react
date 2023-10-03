import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/types";
import { isNil } from "rambda";

import type { RuleContext } from "../../typings";
import { MutList, O } from "../lib/primitives";
import * as AST from "./ast";
import { isComponentName } from "./is-component-name";
import { isJSXValue, isReturnStatementReturningJSX } from "./jsx";
import type { ESFunction } from "./node";

const seenComponents = new WeakSet<ESFunction>();

export function make(context: RuleContext) {
    const components: ESFunction[] = [];
    const functionStack = MutList.make<ESFunction>();
    const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
    const onFunctionEnter = (node: ESFunction) => MutList.append(functionStack, node);
    const onFunctionExit = () => MutList.pop(functionStack);

    const ctx = {
        getAllComponents() {
            if (!AST.is(N.Program)(context.getScope().block)) {
                throw new Error("getAllComponents should only be called in Program:exit");
            }

            return components;
        },
        getCurrentComponents() {
            return [...components];
        },
        getCurrentFunction,
        getCurrentFunctionStack() {
            return [...functionStack];
        },
    } as const;

    const listeners = {
        ArrowFunctionExpression: onFunctionEnter,
        "ArrowFunctionExpression:exit": onFunctionExit,
        FunctionDeclaration: onFunctionEnter,
        "FunctionDeclaration:exit": onFunctionExit,
        FunctionExpression: onFunctionEnter,
        "FunctionExpression:exit": onFunctionExit,
        ReturnStatement(node: TSESTree.ReturnStatement) {
            const maybeCurrentFn = getCurrentFunction();

            if (O.isNone(maybeCurrentFn)) {
                console.warn("Unexpected empty function stack");

                return;
            }

            const currentFn = maybeCurrentFn.value;

            if (seenComponents.has(currentFn)) {
                components.push(currentFn);

                return;
            }

            if (!isReturnStatementReturningJSX(node, context)) {
                return;
            }

            seenComponents.add(currentFn);
            components.push(currentFn);
        },
        // eslint-disable-next-line perfectionist/sort-objects
        "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
            const maybeCurrentFn = getCurrentFunction();

            if (O.isNone(maybeCurrentFn)) {
                console.warn("Unexpected empty function stack");

                return;
            }

            const currentFn = maybeCurrentFn.value;

            if (seenComponents.has(currentFn)) {
                components.push(currentFn);

                return;
            }

            const { body } = node;
            if (!isJSXValue(body, context, false, false)) {
                return;
            }

            const { parent } = currentFn;

            if ("id" in parent && !isNil(parent.id) && "name" in parent.id) {
                const { name } = parent.id;
                if (!isComponentName(name)) {
                    return;
                }
            }

            seenComponents.add(currentFn);
            components.push(currentFn);
        },
    } as const;

    return {
        ctx,
        listeners,
    };
}
