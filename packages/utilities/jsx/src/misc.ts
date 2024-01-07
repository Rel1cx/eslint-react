import { getNestedReturnStatements, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";

import { DEFAULT_JSX_VALUE_HINT, isJSXValue } from "./value";

/**
 * Check if function is returning JSX
 * @param node The return statement node to check
 * @param context The rule context
 * @param hint The `JSXValueHint` to use
 * @returns boolean
 */
export function isFunctionReturningJSXValue(
  node: TSESTreeFunction,
  context: RuleContext,
  hint = DEFAULT_JSX_VALUE_HINT,
) {
  if (node.body.type !== NodeType.BlockStatement) {
    return isJSXValue(node.body, context, hint);
  }

  const statements = getNestedReturnStatements(node.body);

  return statements.some((statement) => isJSXValue(statement.argument, context, hint));
}
