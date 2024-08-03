import { is, NodeType } from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import type { ESLintReactSettings, REACT_BUILD_IN_HOOKS } from "@eslint-react/shared";
import type { ArrayElement } from "@eslint-react/tools";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function isFromHookCall(
  name: ArrayElement<typeof REACT_BUILD_IN_HOOKS>,
  context: RuleContext,
  settings: ESLintReactSettings,
  predicate: (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => boolean = F.constTrue,
) {
  const hookAlias = settings.additionalHooks?.[name] ?? [];
  return (topLevelId: TSESTree.Identifier) =>
    F.pipe(
      findVariable(topLevelId, context.sourceCode.getScope(topLevelId)),
      O.flatMap(getVariableNode(0)),
      O.filter(is(NodeType.CallExpression)),
      O.filter(isReactHookCallWithNameAlias(name, context, hookAlias)),
      O.exists((call) => predicate(topLevelId, call)),
    );
}
