import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { resolve } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";

/**
 * Methods that mutate their receiver in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
export const KNOWN_MUTATING_METHODS = new Set([
  "add",
  "clear",
  "copyWithin",
  "delete",
  "fill",
  "pop",
  "push",
  "reverse",
  "set",
  "shift",
  "sort",
  "splice",
  "unshift",
]);

export function isNodeWithin(node: TSESTree.Node, ancestor: TSESTree.Node) {
  let current: TSESTree.Node | undefined = node;
  while (current != null) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
}

export function isComponentPropsDefinition(ctx: core.RichContext, def: Scope.Definition) {
  if (def.type !== DefinitionType.Parameter) return false;
  const fn = def.node;
  if (!Check.isFunction(fn)) return false;
  const firstParam = fn.params.at(0);
  if (firstParam == null || !isNodeWithin(def.name, firstParam)) return false;
  return core.isFunctionComponentDefinition(ctx._, fn, core.DEFAULT_COMPONENT_DETECTION_HINT);
}

export function getStateHookName(ctx: core.RichContext, init: TSESTree.CallExpression) {
  const { additionalStateHooks } = ctx.settings;
  if (core.isUseStateLikeCall(init, additionalStateHooks)) return Extract.getCalleeName(init) ?? "useState";
  if (core.isUseReducerCall(ctx._, init)) return "useReducer";
  return null;
}

export function getMutableHookNames(env: core.EnvConfig) {
  return Object.entries(env.customHooks)
    .filter(([, config]) => config.valueKind === "mutable")
    .map(([hook]) => hook);
}

export function resolveToFunctionNode(ctx: core.RichContext, node: TSESTree.Node, seen: Set<TSESTree.Node> = new Set()): TSESTreeFunction | null {
  const expr = Extract.unwrap(node);
  if (Check.isFunction(expr)) return expr;
  if (!Check.isIdentifier(expr) || seen.has(expr)) return null;
  seen.add(expr);
  const resolved = resolve(ctx._, expr);
  return resolved == null ? null : resolveToFunctionNode(ctx, resolved, seen);
}

export function resolveVariableOrigin(ctx: core.RichContext, variable: Scope.Variable, seen: Set<Scope.Variable> = new Set()): Scope.Variable {
  const src = ctx.src;
  if (seen.has(variable)) return variable;
  seen.add(variable);
  const def = variable.defs.length === 1 ? variable.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return variable;
  const init = Extract.unwrap(def.node.init);
  if (!Check.isIdentifier(init)) return variable;
  const source = findVariable(src.getScope(init), init);
  return source == null ? variable : resolveVariableOrigin(ctx, source, seen);
}

export function isRefLikeName(name: string) {
  return name === "ref" || name.endsWith("Ref");
}

export function hasRefLikeNameInChain(node: TSESTree.Node): boolean {
  if (Check.isIdentifier(node)) return isRefLikeName(node.name);
  if (node.type !== AST.MemberExpression) return false;
  return Check.isIdentifier(node.property)
    ? isRefLikeName(node.property.name) || hasRefLikeNameInChain(node.object)
    : hasRefLikeNameInChain(node.object);
}

export function isInitializedFromCall(ctx: core.RichContext, node: TSESTree.Expression, isCall: (node: TSESTree.CallExpression) => boolean) {
  const root = Check.isIdentifier(node) ? node : Extract.getIdentifierAt(node, 0);
  if (root == null) return false;
  const src = ctx.src;
  const variable = findVariable(src.getScope(root), root);
  if (variable == null) return false;
  const origin = resolveVariableOrigin(ctx, variable);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return false;
  const init = Extract.unwrap(def.node.init);
  return init.type === AST.CallExpression && isCall(init);
}

export function isInitializedFromUseRef(ctx: core.RichContext, node: TSESTree.Expression) {
  const { additionalRefHooks } = ctx.settings;
  return isInitializedFromCall(ctx, node, (init) => core.isUseRefLikeCall(init, additionalRefHooks));
}

export function isRefLikeChain(ctx: core.RichContext, node: TSESTree.Expression) {
  return hasRefLikeNameInChain(node) || isInitializedFromUseRef(ctx, node);
}
