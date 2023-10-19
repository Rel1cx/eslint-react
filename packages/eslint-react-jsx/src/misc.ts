import { getNestedReturnStatements, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { isJSXValue, type JSXValueCheckOptions } from "./value";

/**
 * Unsafe check whether given node or its parent is directly inside `Array.from` call
 * @param node AST node to check
 * @returns `true` if node is directly inside `Array.from` call, `false` if not
 */
export const unsafeIsArrayFromCall = isMatching({
    type: NodeType.CallExpression,
    callee: {
        type: NodeType.MemberExpression,
        property: {
            name: "from",
        },
    },
});

/**
 * Unsafe check whether given node or its parent is directly inside `map` call
 * ```jsx
 * _ = <div>{items.map(item => <li />)}</div>
 * `                   ^^^^^^^^^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if node is directly inside `map` call, `false` if not
 */
export function unsafeIsMapCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
    return isMatching({
        callee: {
            type: NodeType.MemberExpression,
            property: {
                name: "map",
            },
        },
    })(node);
}

/**
 * Check if function is returning JSX
 * @param node The return statement node to check
 * @param context The rule context
 * @param options JSX value check options
 * @returns boolean
 */
export function isFunctionReturningJSXValue(
    node: TSESTreeFunction,
    context: RuleContext,
    options?: JSXValueCheckOptions,
) {
    if (node.body.type !== NodeType.BlockStatement) {
        return isJSXValue(node.body, context, options);
    }

    const statements = getNestedReturnStatements(node.body);

    return statements.some((statement) => isJSXValue(statement.argument, context, options));
}
