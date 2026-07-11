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

/**
 * Check if `inner` is fully contained within `outer`'s source range.
 * @param inner The node that may be contained.
 * @param outer The node that may contain it.
 */
export function isNodeWithin(inner: TSESTree.Node, outer: TSESTree.Node): boolean {
  return inner.range[0] >= outer.range[0] && inner.range[1] <= outer.range[1];
}

/**
 * Resolve an expression to the function it ultimately refers to, following
 * simple local aliasing (`const fn2 = fn;`) via scope resolution.
 * @param context The ESLint rule context.
 * @param node The expression to resolve.
 * @param seen Identifiers already visited, to guard against cycles.
 */
export function resolveToFunctionNode(context: RuleContext, node: TSESTree.Node, seen: Set<TSESTree.Node> = new Set()): TSESTreeFunction | null {
  const expr = Extract.unwrap(node);
  if (Check.isFunction(expr)) return expr;
  if (expr.type !== AST.Identifier) return null;
  if (seen.has(expr)) return null;
  seen.add(expr);
  const resolved = resolve(context, expr);
  if (resolved == null) return null;
  return resolveToFunctionNode(context, resolved, seen);
}

/**
 * Follow identifier-only variable-declarator aliases to their originating
 * binding. Assignment aliases are intentionally left for the value-flow phase.
 * @param context The ESLint rule context.
 * @param variable The binding whose initializer aliases should be followed.
 * @param seen Bindings already visited, to guard against cycles.
 */
export function resolveVariableOrigin(
  context: RuleContext,
  variable: Scope.Variable,
  seen: Set<Scope.Variable> = new Set(),
): Scope.Variable {
  if (seen.has(variable)) return variable;
  seen.add(variable);
  const definition = variable.defs.length === 1 ? variable.defs[0] : null;
  if (definition?.type !== DefinitionType.Variable || definition.node.init == null) return variable;
  const initializer = Extract.unwrap(definition.node.init);
  if (initializer.type !== AST.Identifier) return variable;
  const source = findVariable(context.sourceCode.getScope(initializer), initializer);
  if (source == null) return variable;
  return resolveVariableOrigin(context, source, seen);
}

/**
 * Check if a name is ref-like ("ref" or ends with "Ref").
 * Refs are mutable by design and exempted from immutability checks.
 * @param name The identifier name to check.
 */
export function isRefLikeName(name: string): boolean {
  return name === "ref" || name.endsWith("Ref");
}

/**
 * Check if any identifier or property name in a member-expression chain
 * is ref-like.
 * @param node The AST node to inspect.
 */
export function hasRefLikeNameInChain(node: TSESTree.Node): boolean {
  if (node.type === AST.Identifier) {
    return isRefLikeName(node.name);
  }
  if (node.type === AST.MemberExpression) {
    const propName = Extract.getPropertyName(node.property);
    if (propName != null && isRefLikeName(propName)) return true;
    return hasRefLikeNameInChain(node.object);
  }
  return false;
}

/**
 * Check if the root identifier of a member-expression chain is initialized
 * from a `useRef()` call, following variable-declarator aliases.
 * @param context The ESLint rule context.
 * @param node The AST node to inspect (an identifier or member-expression chain).
 */
export function isInitializedFromUseRef(context: RuleContext, node: TSESTree.Expression): boolean {
  const root = node.type === AST.Identifier ? node : Extract.getRootIdentifier(node);
  if (root == null) return false;
  const variable = findVariable(context.sourceCode.getScope(root), root);
  if (variable == null) return false;
  return isVariableInitializedFromUseRef(context, variable, new Set());
}

function isVariableInitializedFromUseRef(
  context: RuleContext,
  variable: Scope.Variable,
  seen: Set<Scope.Variable>,
): boolean {
  if (seen.has(variable)) return false;
  seen.add(variable);
  const definition = variable.defs.length === 1 ? variable.defs[0] : null;
  if (definition?.type !== DefinitionType.Variable || definition.node.init == null) return false;
  const initializer = Extract.unwrap(definition.node.init);
  if (initializer.type === AST.CallExpression) return core.isUseRefCall(context, initializer);
  if (initializer.type !== AST.Identifier) return false;
  const source = findVariable(context.sourceCode.getScope(initializer), initializer);
  return source != null && isVariableInitializedFromUseRef(context, source, seen);
}

/**
 * Check if a mutated expression chain should be exempt from immutability
 * checks because it is rooted at a ref: either by naming convention
 * ({@link hasRefLikeNameInChain}) or because it is initialized from a
 * `useRef()` call ({@link isInitializedFromUseRef}).
 * @param context The ESLint rule context.
 * @param node The AST node to inspect (an identifier or member-expression chain).
 */
export function isRefLikeChain(context: RuleContext, node: TSESTree.Expression): boolean {
  return hasRefLikeNameInChain(node) || isInitializedFromUseRef(context, node);
}
