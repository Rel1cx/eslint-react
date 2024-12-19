import * as AST from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { ESLintReactSettings, REACT_BUILD_IN_HOOKS } from "@eslint-react/shared";
import type { ArrayElement, RuleContext } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isFromHookCall(
  name: ArrayElement<typeof REACT_BUILD_IN_HOOKS>,
  context: RuleContext,
  settings: ESLintReactSettings,
  predicate: (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => boolean = F.constTrue,
) {
  const hookAlias = settings.additionalHooks?.[name] ?? [];
  return (topLevelId: TSESTree.Identifier) =>
    F.pipe(
      VAR.findVariable(topLevelId, context.sourceCode.getScope(topLevelId)),
      O.flatMap(VAR.getVariableNode(0)),
      O.filter(AST.is(AST_NODE_TYPES.CallExpression)),
      O.filter(isReactHookCallWithNameAlias(name, context, hookAlias)),
      O.exists((call) => predicate(topLevelId, call)),
    );
}
