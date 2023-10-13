import { is, NodeType, traverseUpGuard } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isValidReactHookName } from "./is-valid-react-hook-name";

/**
 * Unsafe check whether given node is `ReturnStatement` of a React hook
 * @param node The AST node to check
 * @returns `true` if node is a `ReturnStatement` of a React hook, `false` if not
 */
export function unsafeIsReturnStatementOfReactHook(node: TSESTree.Node | null): node is TSESTree.ReturnStatement {
    if (!node || !is(NodeType.ReturnStatement)(node.parent)) {
        return false;
    }
    const callExpression = traverseUpGuard(node, is(NodeType.CallExpression));

    return (
        !!callExpression
        && is(NodeType.Identifier)(callExpression.callee)
        && isValidReactHookName(callExpression.callee.name)
    );
}
