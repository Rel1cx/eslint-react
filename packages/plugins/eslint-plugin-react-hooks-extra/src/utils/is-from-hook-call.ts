import type { REACT_BUILD_IN_HOOKS, RuleContext } from "@eslint-react/kit";
import type { ESLintReactSettingsNormalized } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { constTrue } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isFromHookCall(
  context: RuleContext,
  name: (typeof REACT_BUILD_IN_HOOKS)[number],
  settings: ESLintReactSettingsNormalized,
  predicate: (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => boolean = constTrue,
) {
  const hookAlias = settings.additionalHooks[name] ?? [];
  return (topLevelId: TSESTree.Identifier) => {
    const variable = VAR.findVariable(topLevelId, context.sourceCode.getScope(topLevelId));
    const variableNode = VAR.getVariableInitNode(variable, 0);
    if (variableNode == null) return false;
    if (variableNode.type !== T.CallExpression) return false;
    if (!isReactHookCallWithNameAlias(context, name, hookAlias)(variableNode)) return false;
    return predicate(topLevelId, variableNode);
  };
}
