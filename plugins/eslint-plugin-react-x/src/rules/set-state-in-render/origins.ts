import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { hasProperty } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Create a resolver that answers whether an identifier or call originates from
 * a `useState`-like hook's setter function (the element at index 1 of the
 * returned tuple).
 * @param context The rule context
 * @returns The setState provenance resolver
 */
export function createSetStateResolver(context: RuleContext) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isSetStateId(id: TSESTree.Identifier) {
    const initNode = resolveOrigin(context, id);
    if (initNode?.type !== AST.CallExpression || !isUseStateCall(initNode)) return false;
    const variableNodeParent = initNode.parent;
    if (!hasProperty(variableNodeParent, "id") || variableNodeParent.id?.type !== AST.ArrayPattern) return false;
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e != null && Check.isIdentifier(e, id.name)) === 1;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    return Check.isIdentifier(callee) && isSetStateId(callee);
  }

  return { isSetStateCall, isSetStateId, isUseStateCall } as const;
}
