import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { traverseUpGuard } from "./ast-traverse";
import { is } from "./ast-types";
import { isValidReactHookName } from "./is-valid-name";

/**
 * Unsafe check whether given node is `ReturnStatement` of a React hook
 * @param node The AST node to check
 * @returns `true` if node is a `ReturnStatement` of a React hook, `false` if not
 */
export function unsafeIsReturnStatementOfReactHook(node: TSESTree.Node | null): node is TSESTree.ReturnStatement {
    if (!node || !is(N.ReturnStatement)(node.parent)) {
        return false;
    }
    const callExpression = traverseUpGuard(node, is(N.CallExpression));

    return (
        !!callExpression
        && is(N.Identifier)(callExpression.callee)
        && isValidReactHookName(callExpression.callee.name)
    );
}
