import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOriginChain } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import { hasRefLikeNameInChain, isNodeWithin } from "./helpers";

// #region Origin Types

/**
 * An origin that must be treated as immutable, resolved from a mutated variable.
 */
export type FrozenOrigin =
  | { kind: "props"; name: string }
  | { kind: "state"; name: string; hook: string }
  | { kind: "shallow-copy"; name: string; original: string }
  | { kind: "iterator"; name: string; original: string };

// #endregion

// #region Origin Resolution

/**
 * How far `resolveVariableOrigin` follows a variable's initializer.
 * - `"alias"`: follow every identifier-initializer alias chain (value writes).
 * - `"binding"`: follow only destructured bindings (`const { error } = props`);
 *   a plain alias (`let current = error`) holds no shared binding of its own, so
 *   rebinding it discards only the local alias and must not fold into its source.
 */
export type OriginResolveMode = "alias" | "binding";

export function resolveVariableOrigin(
  context: RuleContext,
  variable: Scope.Variable,
  mode: OriginResolveMode = "alias",
  seen: Set<Scope.Variable> = new Set(),
): Scope.Variable {
  if (seen.has(variable)) return variable;
  seen.add(variable);
  const def = variable.defs.length === 1 ? variable.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return variable;
  if (mode === "binding" && def.node.id.type === AST.Identifier) return variable;
  const init = Extract.unwrap(def.node.init);
  if (!Check.isIdentifier(init)) return variable;
  const source = findVariable(context.sourceCode.getScope(init), init);
  return source == null ? variable : resolveVariableOrigin(context, source, mode, seen);
}

export function resolveToFunctionNode(context: RuleContext, node: TSESTree.Node): TSESTreeFunction | null {
  const expr = Extract.unwrap(node);
  if (Check.isFunction(expr)) return expr;
  if (!Check.isIdentifier(expr)) return null;
  const origin = resolveOriginChain(context, expr);
  const unwrapped = origin == null ? null : Extract.unwrap(origin);
  return unwrapped != null && Check.isFunction(unwrapped) ? unwrapped : null;
}

// #endregion

// #region Origin Classification

export function isComponentPropsDefinition(def: Scope.Definition, components: readonly TSESTreeFunction[]) {
  if (def.type !== DefinitionType.Parameter) return false;
  const fn = def.node;
  if (!Check.isFunction(fn)) return false;
  const firstParam = fn.params.at(0);
  if (firstParam == null || !isNodeWithin(def.name, firstParam)) return false;
  return components.includes(fn);
}

export function getStateHookName(context: RuleContext, init: TSESTree.CallExpression) {
  const { additionalStateHooks } = getSettingsFromContext(context);
  if (core.isUseStateLikeCall(init, additionalStateHooks)) return Extract.getCalleeName(init) ?? "useState";
  if (core.isUseReducerCall(context, init)) return "useReducer";
  return null;
}

// #endregion

// #region Hook Initialization

export function isInitializedFromCall(context: RuleContext, node: TSESTree.Expression, isCall: (node: TSESTree.CallExpression) => boolean) {
  const root = Extract.getMemberChain(node).at(0);
  if (root == null || !Check.isIdentifier(root)) return false;
  const variable = findVariable(context.sourceCode.getScope(root), root);
  if (variable == null) return false;
  const origin = resolveVariableOrigin(context, variable);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def?.type !== DefinitionType.Variable || def.node.init == null) return false;
  const init = Extract.unwrap(def.node.init);
  return init.type === AST.CallExpression && isCall(init);
}

export function isInitializedFromUseRef(context: RuleContext, node: TSESTree.Expression) {
  const { additionalRefHooks } = getSettingsFromContext(context);
  return isInitializedFromCall(context, node, (init) => core.isUseRefLikeCall(init, additionalRefHooks));
}

// #endregion

// #region Ref Detection

export function isRefLikeChain(context: RuleContext, node: TSESTree.Expression) {
  return hasRefLikeNameInChain(node) || isInitializedFromUseRef(context, node);
}

// #endregion

// #region Frozen Origin Classification

/**
 * Classify whether a variable ultimately holds a value that must be treated as
 * immutable: a component's props, a state value returned from `useState`-like or
 * `useReducer` calls, a shallow copy (spread literal) of either, or a `for...of`
 * iterator variable whose iterated collection resolves to one of those.
 * @param context The rule context.
 * @param variable The variable to classify.
 * @param components The confirmed function component nodes in the file.
 * @param mode How far identifier-initializer aliases are followed; `"binding"` stops at plain aliases.
 * @param seen Variables already visited during spread/iterator recursion.
 * @returns The frozen origin, or `null` when the variable is not derived from one.
 */
export function classifyFrozenOrigin(
  context: RuleContext,
  variable: Scope.Variable,
  components: readonly TSESTreeFunction[],
  mode: OriginResolveMode = "alias",
  seen: Set<Scope.Variable> = new Set(),
): FrozenOrigin | null {
  if (seen.has(variable)) return null;
  seen.add(variable);
  const origin = resolveVariableOrigin(context, variable, mode);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def == null) return null;
  if (isComponentPropsDefinition(def, components)) {
    return { kind: "props", name: origin.name };
  }
  if (def.type !== DefinitionType.Variable) return null;
  // `for (const item of items)`: the iterator variable is bound to each element
  // of the iterated collection, so it shares the collection's frozen origin.
  // The right side is traced through its root identifier, so member-expression
  // collections (`for (const item of props.items)`) resolve to their root.
  if (def.node.init == null) {
    const loop = def.node.parent.parent;
    if (loop.type !== AST.ForOfStatement || loop.left !== def.node.parent) return null;
    const root = Extract.getMemberChain(loop.right).at(0);
    if (root == null || !Check.isIdentifier(root)) return null;
    const source = findVariable(context.sourceCode.getScope(root), root);
    if (source == null) return null;
    const inner = classifyFrozenOrigin(context, source, components, mode, seen);
    return inner == null ? null : { kind: "iterator", name: origin.name, original: inner.name };
  }
  const init = Extract.unwrap(def.node.init);
  switch (init.type) {
    // `const [state, setState] = useState(...)`: only the element at index 0 is the state value.
    case AST.CallExpression: {
      const hook = getStateHookName(context, init);
      if (hook == null) return null;
      if (def.node.id.type !== AST.ArrayPattern) return null;
      const first = def.node.id.elements.at(0);
      if (first == null || !isNodeWithin(def.name, first)) return null;
      return { kind: "state", name: origin.name, hook };
    }
    // `const copy = { ...state }` / `const copy = [...state]`: the copy's own
    // top-level slots are new, but nested values still reference the original.
    case AST.ArrayExpression:
    case AST.ObjectExpression: {
      const elements: (TSESTree.Node | null)[] = init.type === AST.ObjectExpression ? init.properties : init.elements;
      for (const element of elements) {
        if (element?.type !== AST.SpreadElement) continue;
        const argument = Extract.unwrap(element.argument);
        if (!Check.isIdentifier(argument)) continue;
        const source = findVariable(context.sourceCode.getScope(argument), argument);
        if (source == null) continue;
        const inner = classifyFrozenOrigin(context, source, components, mode, seen);
        if (inner != null) return { kind: "shallow-copy", name: origin.name, original: inner.name };
      }
      return null;
    }
    default:
      return null;
  }
}

// #endregion
