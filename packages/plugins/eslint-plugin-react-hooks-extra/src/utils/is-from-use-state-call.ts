import { is, NodeType } from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function isFromUseStateCall(context: RuleContext, useStateAlias: string[]) {
  return (topLevelId: TSESTree.Identifier) => {
    const useStateCall = F.pipe(
      findVariable(topLevelId, context.sourceCode.getScope(topLevelId)),
      O.flatMap(getVariableNode(0)),
      O.filter(is(NodeType.CallExpression)),
      O.filter(isReactHookCallWithNameAlias("useState", context, useStateAlias)),
    );
    if (O.isNone(useStateCall)) return false;
    const { parent } = useStateCall.value;
    if (!("id" in parent && parent.id?.type === NodeType.ArrayPattern)) return true;
    return parent.id.elements.findIndex(e => e?.type === NodeType.Identifier && e.name === topLevelId.name) === 1;
  };
}
