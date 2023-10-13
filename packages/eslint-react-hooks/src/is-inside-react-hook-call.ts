import { is, NodeType, traverseUpGuard } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isValidReactHookName } from "./is-valid-react-hook-name";

export function unsafeIsReactHookCall(node: TSESTree.CallExpression) {
    if (node.callee.type === NodeType.Identifier) {
        return isValidReactHookName(node.callee.name);
    }

    if (node.callee.type === NodeType.MemberExpression) {
        return (
            node.callee.property.type === NodeType.Identifier
            && isValidReactHookName(node.callee.property.name)
        );
    }

    return false;
}

export function unsafeIsInsideReactHookCall(node: TSESTree.Node): boolean {
    const callExpression = traverseUpGuard(node, is(NodeType.CallExpression));

    return (
        !!callExpression
        && unsafeIsReactHookCall(callExpression)
    );
}
