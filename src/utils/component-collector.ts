import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/types";
import { isNil } from "rambda";

import type { RuleContext } from "../../typings";
import { MutList, O } from "../lib/primitives";
import { AST, type FunctionNode } from "./ast";
import { isComponentName } from "./is-component-name";
import { isJSXValue, isReturnStatementReturningJSX } from "./jsx";

const seenComponents = new Set<FunctionNode>();

export function make(context: RuleContext) {
    const components = new Set<FunctionNode>();
    const functionStack = MutList.make<FunctionNode>();
    const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
    const onFunctionEnter = (node: FunctionNode) => MutList.append(functionStack, node);
    const onFunctionExit = () => MutList.pop(functionStack);

    const ctx = {
        getAllComponents() {
            if (!AST.is(N.Program)(context.getScope().block)) {
                throw new Error("getAllComponents should only be called in Program:exit");
            }

            return components;
        },
        getCurrentComponents() {
            return new Set(components);
        },
        getCurrentFunction,
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
                return console.warn("Unexpected empty function stack");
            }

            const currentFn = maybeCurrentFn.value;

            if (seenComponents.has(currentFn)) {
                return components.add(currentFn);
            }

            const hasJsx = isReturnStatementReturningJSX(node, context);

            if (!hasJsx || MutList.isEmpty(functionStack)) {
                return;
            }

            seenComponents.add(currentFn);
            components.add(currentFn);
        },
        // eslint-disable-next-line perfectionist/sort-objects
        "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
            const maybeCurrentFn = getCurrentFunction();

            if (O.isNone(maybeCurrentFn)) {
                return console.warn("Unexpected empty function stack");
            }

            const currentFn = maybeCurrentFn.value;

            const { body } = node;
            const hasJsx = isJSXValue(body, context, false, false);
            if (!hasJsx || MutList.isEmpty(functionStack)) {
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
            components.add(currentFn);
        },
    } as const;

    return {
        ctx,
        listeners,
    };
}
