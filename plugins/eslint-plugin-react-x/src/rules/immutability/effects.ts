import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { type RichContext, isAPICall } from "@eslint-react/core";
import { ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { MutationFact } from "./collect";
import { getMutableHookNames, isInitializedFromCall, isRefLikeChain, isRefLikeName, resolveVariableOrigin } from "./lib";
import { classifyFrozenOrigin } from "./origins";

export type MutationEffect = {
  name: string;
  node: TSESTree.Node;
};

export type MutableFunctionMap = Map<TSESTreeFunction, MutationEffect>;

export type DirectMutation = {
  name: string;
  detail: string;
  node: TSESTree.Node;
};

function isGlobalOrModuleVariable(variable: Scope.Variable) {
  return variable.defs.length === 0 || variable.scope.type === ScopeType.global || variable.scope.type === ScopeType.module;
}

function isRefMutation(context: RichContext, mutation: MutationFact) {
  if (Check.isIdentifier(mutation.target)) return isRefLikeName(mutation.target.name);
  return isRefLikeChain(context, mutation.target);
}

export function inferMutableFunctions(context: RichContext, mutations: readonly MutationFact[]): MutableFunctionMap {
  const src = context.src;
  const env = context.getEnvConfig();
  const mutableHooks = getMutableHookNames(env);
  const mutableFunctions: MutableFunctionMap = new Map();

  for (const mutation of mutations) {
    if (mutation.node.type === AST.CallExpression) {
      const callee = Extract.unwrap(mutation.node.callee);
      // Calls on a value returned from a hook configured with `valueKind: "mutable"` mutate freely and are not mutations.
      if (Check.isExpression(callee) && isInitializedFromCall(context, callee, (init) => mutableHooks.some((hook) => isAPICall(hook)(context, init)))) {
        continue;
      }
    }
    if (isRefMutation(context, mutation)) continue;
    const variable = findVariable(src.getScope(mutation.root), mutation.root);
    if (variable == null) continue;
    const origin = mutation.kind === "binding"
      ? variable
      : resolveVariableOrigin(context, variable);
    if (isGlobalOrModuleVariable(origin)) continue;

    const declaration = origin.identifiers.at(0) ?? null;
    let current: TSESTreeFunction | null = mutation.enclosingFunction;
    while (current != null) {
      if (declaration != null && Traverse.findParent(declaration, Check.isFunction) === current) break;
      if (!mutableFunctions.has(current)) {
        mutableFunctions.set(current, { name: origin.name, node: mutation.node });
      }
      current = Traverse.findParent(current, Check.isFunction);
    }
  }

  return mutableFunctions;
}

function getMutatedObject(mutation: MutationFact): TSESTree.Node {
  const target = Extract.unwrap(mutation.target);
  // For mutating method calls the target is the receiver, which is the mutated object itself.
  if (mutation.node.type === AST.CallExpression) return target;
  // For assignments, updates, and deletions the mutated object is the object of the written member.
  return target.type === AST.MemberExpression ? Extract.unwrap(target.object) : target;
}

export function inferDirectMutations(context: RichContext, mutations: readonly MutationFact[]): DirectMutation[] {
  const src = context.src;
  const env = context.getEnvConfig();
  const mutableHooks = getMutableHookNames(env);
  const directMutations: DirectMutation[] = [];

  for (const mutation of mutations) {
    if (mutation.kind !== "value") continue;
    if (mutation.node.type === AST.CallExpression) {
      const callee = Extract.unwrap(mutation.node.callee);
      // Calls on a value returned from a hook configured with `valueKind: "mutable"` mutate freely and are not mutations.
      if (Check.isExpression(callee) && isInitializedFromCall(context, callee, (init) => mutableHooks.some((hook) => isAPICall(hook)(context, init)))) {
        continue;
      }
    }
    if (isRefMutation(context, mutation)) continue;
    const variable = findVariable(src.getScope(mutation.root), mutation.root);
    if (variable == null) continue;
    const origin = classifyFrozenOrigin(context, variable);
    if (origin == null) continue;
    switch (origin.kind) {
      case "props": {
        directMutations.push({
          name: origin.name,
          detail: "It is a prop of this component and must be treated as immutable.",
          node: mutation.node,
        });
        break;
      }
      case "state": {
        directMutations.push({
          name: origin.name,
          detail: `It is a state value returned from '${origin.hook}' and must be treated as immutable.`,
          node: mutation.node,
        });
        break;
      }
      case "shallow-copy": {
        // A shallow copy's own top-level slots are new; only mutations reaching
        // a nested value (which is still shared with the original) are reported.
        if (getMutatedObject(mutation).type !== AST.MemberExpression) continue;
        directMutations.push({
          name: origin.name,
          detail: `It is a shallow copy of '${origin.original}'; mutating nested values through it mutates '${origin.original}' in place.`,
          node: mutation.node,
        });
        break;
      }
    }
  }

  return directMutations;
}
