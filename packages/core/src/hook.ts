import { Check, Extract, type TSESTreeDirective, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RegExpLike } from "@eslint-react/shared";
import { constFalse } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type FunctionID, getFunctionId } from "./function";
import type { SemanticNode } from "./semantic";

// #region Types

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic hook node in the AST.
 */
export interface HookSemanticNode extends SemanticNode {
  /** The identifier of the hook. */
  id: FunctionID;
  /** The AST node of the hook. */
  node: TSESTreeFunction;
  /** The kind of hook. */
  kind: "hook";
  /** List of expressions returned by the hook. */
  rets: TSESTree.ReturnStatement["argument"][];
  /** The other hooks called by the hook. */
  hookCalls: HookCall[];
  /** The directives used in the function (ex: "use strict", "use client", etc.). */
  directives: TSESTreeDirective[];
}
/* eslint-enable perfectionist/sort-interfaces */

// #endregion

// #region Hook Call

/** Represents a hook call, which can be a call expression or a tagged template expression. */
export type HookCall = TSESTree.CallExpression | TSESTree.TaggedTemplateExpression;

// #endregion

// #region Hook Name

/** The names of React's built-in hooks. */
export const REACT_BUILTIN_HOOK_NAMES = [
  "use",
  "useActionState",
  "useCallback",
  "useContext",
  "useDebugValue",
  "useDeferredValue",
  "useEffect",
  "useFormStatus",
  "useId",
  "useImperativeHandle",
  "useInsertionEffect",
  "useLayoutEffect",
  "useMemo",
  "useOptimistic",
  "useReducer",
  "useRef",
  "useState",
  "useSyncExternalStore",
  "useTransition",
] as const;

/**
 * Check if the name is a hook name (starts with `use` followed by an uppercase letter or digit).
 * @param name The name of the identifier to check.
 * @returns `true` if the name is a hook name.
 * @see https://github.com/facebook/react/blob/1d6c8168db1d82713202e842df3167787ffa00ed/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L16
 */
export function isHookName(name: string) {
  return name === "use" || /^use[A-Z0-9]/.test(name);
}

// #endregion

// #region Hook ID

/**
 * Checks if the given node is a hook identifier.
 * @param id The AST node to check.
 * @returns `true` if the node is a hook identifier or member expression with hook name, `false` otherwise.
 */
export function isHookId(id: TSESTree.Node): id is TSESTree.Identifier | TSESTree.MemberExpression {
  switch (id.type) {
    case AST.Identifier:
      return isHookName(id.name);
    case AST.MemberExpression:
      return "name" in id.property
        && isHookName(id.property.name);
    default:
      return false;
  }
}

/**
 * Checks if the given expression is a hook tag (callee / tagged template tag).
 * @param tag The expression node to check.
 * @returns `true` if the expression is a hook identifier or member expression with hook name, `false` otherwise.
 */
export function isHookTag(tag: TSESTree.Node | null): boolean {
  if (tag == null) return false;
  return isHookId(Extract.unwrap(tag));
}

// #endregion

// #region Hook Predicates

/**
 * Check if the function node is a hook definition based on its name.
 * @param node The function node to check.
 * @returns `true` if the function is a hook definition.
 */
export function isHookDefinition(node: TSESTreeFunction | null) {
  if (node == null) return false;
  const id = getFunctionId(node);
  switch (id?.type) {
    case AST.Identifier:
      return isHookName(id.name);
    case AST.MemberExpression:
      return "name" in id.property && isHookName(id.property.name);
    default:
      return false;
  }
}

/**
 * Check if the node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isHookCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) return false;
  const name = Extract.getCalleeName(node);
  if (name == null) return false;
  return isHookName(name);
}

/**
 * Check if the node is a useRef-like call (ex: `useRef` or a custom ref hook).
 * @param node The AST node to check.
 * @param additionalRefHooks Regex pattern matching custom hooks that should be treated as ref hooks.
 * @returns `true` if the node is a useRef-like call.
 */
export function isUseRefLikeCall(node: TSESTree.Node | null, additionalRefHooks: RegExpLike = { test: constFalse }): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) return false;
  const name = Extract.getCalleeName(node);
  if (name == null) return false;
  return name === "useRef" || additionalRefHooks.test(name);
}

/**
 * Check if the node is a useState-like call (ex: `useState` or a custom state hook).
 * @param node The AST node to check.
 * @param additionalStateHooks Regex pattern matching custom hooks that should be treated as state hooks.
 * @returns `true` if the node is a useState-like call.
 */
export function isUseStateLikeCall(node: TSESTree.Node | null, additionalStateHooks: RegExpLike = { test: constFalse }): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) return false;
  const name = Extract.getCalleeName(node);
  if (name == null) return false;
  return name === "useState" || additionalStateHooks.test(name);
}

/**
 * Check if the node is a useEffect-like call (ex: `useEffect`, `useLayoutEffect`, or a custom effect hook).
 * @param node The AST node to check.
 * @param additionalEffectHooks Regex pattern matching custom hooks that should be treated as effect hooks.
 * @returns `true` if the node is a useEffect-like call.
 */
export function isUseEffectLikeCall(node: TSESTree.Node | null, additionalEffectHooks: RegExpLike = { test: constFalse }): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) return false;
  const name = Extract.getCalleeName(node);
  if (name == null) return false;
  return /^use\w*Effect$/u.test(name) || additionalEffectHooks.test(name);
}

// #endregion

// #region Effect Callbacks

/**
 * Check if the node is the setup callback passed to a useEffect-like call.
 * @param node The AST node to check.
 * @returns `true` if the node is a useEffect setup callback.
 */
export function isUseEffectSetupCallback(node: TSESTree.Node | null) {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  return expr.parent?.type === AST.CallExpression
    && expr.parent.arguments.at(0) === expr
    && isUseEffectLikeCall(expr.parent);
}

/**
 * Check if the node is the cleanup callback returned by a useEffect-like setup callback.
 * @param node The AST node to check.
 * @returns `true` if the node is a useEffect cleanup callback.
 */
export function isUseEffectCleanupCallback(node: TSESTree.Node | null) {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  const returnStatement = Traverse.findParent(expr, Check.is(AST.ReturnStatement));
  const enclosingFunction = Traverse.findParent(expr, Check.isFunction);
  const enclosingFunctionOfReturn = Traverse.findParent(returnStatement, Check.isFunction);

  if (enclosingFunction !== enclosingFunctionOfReturn) return false;

  return isUseEffectSetupCallback(enclosingFunction);
}

// #endregion
