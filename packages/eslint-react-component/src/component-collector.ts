import { getFunctionIdentifier, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { isChildrenOfCreateElement } from "@eslint-react/create-element";
import { isJSXValue } from "@eslint-react/jsx";
import { MutList, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import { isValidReactComponentName } from "./is-valid-react-component-name";

const seenComponents = new WeakSet<TSESTreeFunction>();

export const hasInvalidName = (node: TSESTreeFunction) => {
    const id = getFunctionIdentifier(node);

    return id && !isValidReactComponentName(id.name);
};

export const hasInvalidHierarchicalRelationship = (node: TSESTreeFunction, context: RuleContext) => {
    return isChildrenOfCreateElement(node, context)
        || isFunctionOfRenderMethod(node, context);
};

export function componentCollector(context: RuleContext) {
    const components: TSESTreeFunction[] = [];
    const functionStack = MutList.make<TSESTreeFunction>();
    const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
    const onFunctionEnter = (node: TSESTreeFunction) => MutList.append(functionStack, node);
    const onFunctionExit = () => MutList.pop(functionStack);

    const ctx = {
        getAllComponents() {
            if (context.getScope().block.type !== NodeType.Program) {
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

            if (
                hasInvalidName(currentFn)
                || !isJSXValue(node.argument, context, false, false)
                || hasInvalidHierarchicalRelationship(currentFn, context)
            ) {
                return;
            }

            seenComponents.add(currentFn);
            components.push(currentFn);
        },
        // eslint-disable-next-line perfectionist/sort-objects
        "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
            if (seenComponents.has(node)) {
                components.push(node);

                return;
            }

            const { body } = node;
            if (
                hasInvalidName(node)
                || !isJSXValue(body, context, false, false)
                || hasInvalidHierarchicalRelationship(node, context)
            ) {
                return;
            }

            seenComponents.add(node);
            components.push(node);
        },
    } as const satisfies RuleListener;

    return {
        ctx,
        listeners,
    } as const;
}
