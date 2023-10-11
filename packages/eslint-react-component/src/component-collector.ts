import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { RuleContext } from "../../typings";
import { MutList, O } from "../lib";
import type * as AST from "./ast-types";
import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import { isChildrenOfCreateElement } from "./is-children-of-create-element";
import { isValidReactComponentName } from "./is-valid-name";
import { isJSXValue } from "./jsx";
import { getFunctionIdentifier } from "./misc";

const seenComponents = new WeakSet<AST.TSESTreeFunction>();

export const hasInvalidName = (node: AST.TSESTreeFunction) => {
    const id = getFunctionIdentifier(node);

    return id && !isValidReactComponentName(id.name);
};

export const hasInvalidHierarchicalRelationship = (node: AST.TSESTreeFunction, context: RuleContext) => {
    return isChildrenOfCreateElement(node, context)
        || isFunctionOfRenderMethod(node, context);
};

export function make(context: RuleContext) {
    const components: AST.TSESTreeFunction[] = [];
    const functionStack = MutList.make<AST.TSESTreeFunction>();
    const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
    const onFunctionEnter = (node: AST.TSESTreeFunction) => MutList.append(functionStack, node);
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
