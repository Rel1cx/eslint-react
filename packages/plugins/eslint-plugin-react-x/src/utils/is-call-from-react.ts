import * as core from "@eslint-react/core";
import { type RuleContext, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Check whether a call expression comes from the configured React import source.
 *
 * Supports direct calls such as `useContext()` and member calls such as `React.useContext()`.
 *
 * @param context The rule context used to resolve settings and scope.
 * @param node The call expression to inspect.
 * @returns True if the call target is initialized from React, false otherwise.
 */
export function isCallFromReact(
  context: RuleContext,
  node: TSESTree.CallExpression,
) {
  const { importSource } = getSettingsFromContext(context);
  const initialScope = context.sourceCode.getScope(node);
  switch (node.callee.type) {
    case AST.Identifier:
      return core.isInitializedFromReact(node.callee.name, initialScope, importSource);
    case AST.MemberExpression:
      return node.callee.object.type === AST.Identifier
        && core.isInitializedFromReact(node.callee.object.name, initialScope, importSource);
    default:
      return false;
  }
}
