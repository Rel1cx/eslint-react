import { Check, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { MutationFact } from "./collect";
import { isKnownNonMutatingMethodCall, isNodeWithin, isRefLikeChain, isRefLikeName, resolveVariableOrigin } from "./lib";

export type MutationEffect = {
  name: string;
  node: TSESTree.Node;
};

export type MutableFunctionMap = Map<TSESTreeFunction, MutationEffect>;

function isGlobalOrModuleVariable(variable: Scope.Variable): boolean {
  return variable.defs.length === 0 || variable.scope.type === ScopeType.global || variable.scope.type === ScopeType.module;
}

function isRefMutation(context: RuleContext, mutation: MutationFact): boolean {
  if (mutation.target.type === AST.Identifier) return isRefLikeName(mutation.target.name);
  return isRefLikeChain(context, mutation.target);
}

export function inferMutableFunctions(context: RuleContext, mutations: readonly MutationFact[]): MutableFunctionMap {
  const mutableFunctions: MutableFunctionMap = new Map();

  for (const mutation of mutations) {
    if (mutation.node.type === AST.CallExpression && isKnownNonMutatingMethodCall(context, mutation.node)) continue;
    if (isRefMutation(context, mutation)) continue;
    const variable = findVariable(context.sourceCode.getScope(mutation.root), mutation.root);
    if (variable == null) continue;
    const origin = mutation.kind === "binding"
      ? variable
      : resolveVariableOrigin(context, variable);
    if (isGlobalOrModuleVariable(origin)) continue;

    const declaration = origin.identifiers.at(0) ?? null;
    let current: TSESTreeFunction | null = mutation.enclosingFunction;
    while (current != null) {
      if (declaration != null && isNodeWithin(declaration, current)) break;
      if (!mutableFunctions.has(current)) {
        mutableFunctions.set(current, { name: origin.name, node: mutation.node });
      }
      current = Traverse.findParent(current, Check.isFunction);
    }
  }

  return mutableFunctions;
}
