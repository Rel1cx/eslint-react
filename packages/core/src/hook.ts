import { Check, Extract, type TSESTreeDirective, type TSESTreeFunction, Traverse, is } from "@eslint-react/ast";
import type { RegExpLike } from "@eslint-react/shared";
import { constFalse } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { type FunctionID, getFunctionId } from "./function";
import type { SemanticNode } from "./semantic";

// #region Types

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic hook node in the AST
 */
export interface HookSemanticNode extends SemanticNode {
  /** The identifier of the hook */
  id: FunctionID;
  /** The AST node of the hook */
  node: TSESTreeFunction;
  /** The kind of hook */
  kind: "hook";
  /** List of expressions returned by the hook */
  rets: TSESTree.ReturnStatement["argument"][];
  /** The other hooks called by the hook */
  hookCalls: TSESTree.CallExpression[];
  /** The directives used in the function (ex: "use strict", "use client", etc.) */
  directives: TSESTreeDirective[];
}
/* eslint-enable perfectionist/sort-interfaces */

// #endregion

// #region Hook Name

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
 * Catch all identifiers that begin with "use" followed by an uppercase Latin
 * character to exclude identifiers like "user".
 * @param name The name of the identifier to check.
 * @see https://github.com/facebook/react/blob/1d6c8168db1d82713202e842df3167787ffa00ed/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L16
 */
export function isHookName(name: string) {
  return name === "use" || /^use[A-Z0-9]/.test(name);
}

// #endregion

// #region Hook ID

/**
 * Checks if the given node is a hook identifier
 * @param id The AST node to check
 * @returns `true` if the node is a hook identifier or member expression with hook name, `false` otherwise
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

// #endregion

// #region Hook Predicates

/**
 * Determine if a function node is a React Hook based on its name.
 * @param node The function node to check
 * @returns True if the function is a React Hook, false otherwise
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
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isHookCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  if (expr.type !== AST.CallExpression) {
    return false;
  }
  if (expr.callee.type === AST.Identifier) {
    return isHookName(expr.callee.name);
  }
  if (expr.callee.type === AST.MemberExpression) {
    return expr.callee.property.type === AST.Identifier && isHookName(expr.callee.property.name);
  }
  return false;
}

/**
 * Detect useEffect calls and variations (useLayoutEffect, etc.) using a regex pattern
 * @param node The AST node to check
 * @param additionalEffectHooks Regex pattern matching custom hooks that should be treated as effect hooks
 * @returns True if the node is a useEffect-like call
 */
export function isUseEffectLikeCall(
  node: TSESTree.Node | null,
  additionalEffectHooks: RegExpLike = { test: constFalse },
): node is TSESTree.CallExpression {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  if (expr.type !== AST.CallExpression) {
    return false;
  }
  const callee = Extract.unwrap(expr.callee);
  return [/^use\w*Effect$/u, additionalEffectHooks].some((regexp) => {
    if (callee.type === AST.Identifier) {
      return regexp.test(callee.name);
    }
    if (callee.type === AST.MemberExpression) {
      return callee.property.type === AST.Identifier && regexp.test(callee.property.name);
    }
    return false;
  });
}

/**
 * Detect useState calls and variations using a regex pattern
 * @param node The AST node to check
 * @param additionalStateHooks Regex pattern matching custom hooks that should be treated as state hooks
 * @returns True if the node is a useState-like call
 */
export function isUseStateLikeCall(
  node: TSESTree.Node | null,
  additionalStateHooks: RegExpLike = { test: constFalse },
): node is TSESTree.CallExpression {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  if (expr.type !== AST.CallExpression) {
    return false;
  }
  const callee = Extract.unwrap(expr.callee);
  switch (true) {
    case callee.type === AST.Identifier:
      return callee.name === "useState"
        || additionalStateHooks.test(callee.name);
    case callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier:
      return Extract.getPropertyName(callee.property) === "useState"
        || additionalStateHooks.test(callee.property.name);
  }
  return false;
}

// #endregion

// #region Effect Callbacks

/**
 * Determine if a node is the setup function passed to a useEffect-like hook
 * @param node The AST node to check
 */
export function isUseEffectSetupCallback(node: TSESTree.Node | null) {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  return expr.parent?.type === AST.CallExpression
    && expr.parent.arguments.at(0) === expr
    && isUseEffectLikeCall(expr.parent);
}

/**
 * Determine if a node is the cleanup function returned by a useEffect-like hook's setup function
 * @param node The AST node to check
 */
export function isUseEffectCleanupCallback(node: TSESTree.Node | null) {
  if (node == null) return false;
  const expr = Extract.unwrap(node);
  const returnStatement = Traverse.findParent(expr, is(AST.ReturnStatement));
  const enclosingFunction = Traverse.findParent(expr, Check.isFunction);
  const enclosingFunctionOfReturn = Traverse.findParent(returnStatement, Check.isFunction);

  if (enclosingFunction !== enclosingFunctionOfReturn) return false;

  return isUseEffectSetupCallback(enclosingFunction);
}

// #endregion
