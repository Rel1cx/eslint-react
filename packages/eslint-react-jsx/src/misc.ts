import { getNestedReturnStatements, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";

import { isJSXValue, type JSXValueCheckOptions } from "./value";

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
