import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
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
export const MUTATING_METHODS = new Set([
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

export const isUseRouterCall = core.isAPICall("useRouter");

export function resolveToFunctionNode(context: RuleContext, node: TSESTree.Node, seen: Set<TSESTree.Node> = new Set()): TSESTreeFunction | null {
  const expr = Extract.unwrap(node);
  if (Check.isFunction(expr)) return expr;
  if (expr.type !== AST.Identifier || seen.has(expr)) return null;
  seen.add(expr);
  const resolved = resolve(context, expr);
  return resolved == null ? null : resolveToFunctionNode(context, resolved, seen);
}

export function resolveVariableOrigin(context: RuleContext, variable: Scope.Variable, seen: Set<Scope.Variable> = new Set()): Scope.Variable {
  if (seen.has(variable)) return variable;
  seen.add(variable);
  const def = variable.defs.length === 1 ? variable.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return variable;
  const init = Extract.unwrap(def.node.init);
  if (init.type !== AST.Identifier) return variable;
  const source = findVariable(context.sourceCode.getScope(init), init);
  return source == null ? variable : resolveVariableOrigin(context, source, seen);
}

export function isRefLikeName(name: string) {
  return name === "ref" || name.endsWith("Ref");
}

export function hasRefLikeNameInChain(node: TSESTree.Node): boolean {
  if (node.type === AST.Identifier) return isRefLikeName(node.name);
  if (node.type !== AST.MemberExpression) return false;
  const propertyName = Extract.getPropertyName(node.property);
  return propertyName != null
    ? isRefLikeName(propertyName) || hasRefLikeNameInChain(node.object)
    : hasRefLikeNameInChain(node.object);
}

function isInitializedFromCall(context: RuleContext, node: TSESTree.Expression, isCall: (node: TSESTree.CallExpression) => boolean) {
  const root = node.type === AST.Identifier ? node : Extract.getRootIdentifier(node);
  if (root == null) return false;
  const variable = findVariable(context.sourceCode.getScope(root), root);
  if (variable == null) return false;
  const origin = resolveVariableOrigin(context, variable);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return false;
  const init = Extract.unwrap(def.node.init);
  return init.type === AST.CallExpression && isCall(init);
}

export function isInitializedFromUseRef(context: RuleContext, node: TSESTree.Expression) {
  return isInitializedFromCall(context, node, (init) => core.isUseRefCall(context, init));
}

export function isInitializedFromUseRouter(context: RuleContext, node: TSESTree.Expression) {
  return isInitializedFromCall(context, node, (init) => isUseRouterCall(context, init));
}

export function isKnownNonMutatingMethodCall(context: RuleContext, node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  return Check.isExpression(callee) && isInitializedFromUseRouter(context, callee);
}

export function isRefLikeChain(context: RuleContext, node: TSESTree.Expression) {
  return hasRefLikeNameInChain(node) || isInitializedFromUseRef(context, node);
}
