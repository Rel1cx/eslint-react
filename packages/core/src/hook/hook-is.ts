import * as ast from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { constFalse, flip } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import type { RegExpLike } from "@eslint-react/shared";
import { isHookName } from "./hook-name";

/**
 * Determine if a function node is a React Hook based on its name.
 * @param node The function node to check
 * @returns True if the function is a React Hook, false otherwise
 */
export function isHook(node: ast.TSESTreeFunction | unit) {
  if (node == null) return false;
  const id = ast.getFunctionId(node);
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
export function isHookCall(node: TSESTree.Node | unit): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) {
    return false;
  }
  if (node.callee.type === AST.Identifier) {
    return isHookName(node.callee.name);
  }
  if (node.callee.type === AST.MemberExpression) {
    return node.callee.property.type === AST.Identifier && isHookName(node.callee.property.name);
  }
  return false;
}

/**
 * Check if a node is a call to a specific React hook.
 * Returns a function that accepts a hook name to check against.
 * @param node The AST node to check
 * @returns A function that takes a hook name and returns boolean
 */
export function isHookCallWithName(node: TSESTree.Node | unit) {
  if (node == null || node.type !== AST.CallExpression) return constFalse;
  return (name: string) => {
    switch (node.callee.type) {
      case AST.Identifier:
        return node.callee.name === name;
      case AST.MemberExpression:
        return node.callee.property.type === AST.Identifier && node.callee.property.name === name;
      default:
        return false;
    }
  };
}

/**
 * Detect useEffect calls and variations (useLayoutEffect, etc.) using a regex pattern
 * @param node The AST node to check
 * @param additionalEffectHooks Regex pattern matching custom hooks that should be treated as effect hooks
 * @returns True if the node is a useEffect-like call
 */
export function isUseEffectLikeCall(
  node: TSESTree.Node | unit,
  additionalEffectHooks: RegExpLike = { test: constFalse },
): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) {
    return false;
  }
  return [/^use\w*Effect$/u, additionalEffectHooks].some((regexp) => {
    if (node.callee.type === AST.Identifier) {
      return regexp.test(node.callee.name);
    }
    if (node.callee.type === AST.MemberExpression) {
      return node.callee.property.type === AST.Identifier && regexp.test(node.callee.property.name);
    }
    return false;
  });
}

/**
 * Detect useState calls and variations (useCustomState, etc.) using a regex pattern
 * @param node The AST node to check
 * @param additionalStateHooks Regex pattern matching custom hooks that should be treated as state hooks
 * @returns True if the node is a useState-like call
 */
export function isUseStateLikeCall(
  node: TSESTree.Node | unit,
  additionalStateHooks: RegExpLike = { test: constFalse },
): node is TSESTree.CallExpression {
  if (node == null) return false;
  if (node.type !== AST.CallExpression) {
    return false;
  }
  return [/^use\w*State$/u, additionalStateHooks].some((regexp) => {
    if (node.callee.type === AST.Identifier) {
      return regexp.test(node.callee.name);
    }
    if (node.callee.type === AST.MemberExpression) {
      return node.callee.property.type === AST.Identifier && regexp.test(node.callee.property.name);
    }
    return false;
  });
}

// Utility functions for specific React hooks - each returns a function that checks if a node calls that specific hook
export const isUseCall = flip(isHookCallWithName)("use");
export const isUseActionStateCall = flip(isHookCallWithName)("useActionState");
export const isUseCallbackCall = flip(isHookCallWithName)("useCallback");
export const isUseContextCall = flip(isHookCallWithName)("useContext");
export const isUseDebugValueCall = flip(isHookCallWithName)("useDebugValue");
export const isUseDeferredValueCall = flip(isHookCallWithName)("useDeferredValue");
export const isUseEffectCall = flip(isHookCallWithName)("useEffect");
export const isUseFormStatusCall = flip(isHookCallWithName)("useFormStatus");
export const isUseIdCall = flip(isHookCallWithName)("useId");
export const isUseImperativeHandleCall = flip(isHookCallWithName)("useImperativeHandle");
export const isUseInsertionEffectCall = flip(isHookCallWithName)("useInsertionEffect");
export const isUseLayoutEffectCall = flip(isHookCallWithName)("useLayoutEffect");
export const isUseMemoCall = flip(isHookCallWithName)("useMemo");
export const isUseOptimisticCall = flip(isHookCallWithName)("useOptimistic");
export const isUseReducerCall = flip(isHookCallWithName)("useReducer");
export const isUseRefCall = flip(isHookCallWithName)("useRef");
export const isUseStateCall = flip(isHookCallWithName)("useState");
export const isUseSyncExternalStoreCall = flip(isHookCallWithName)("useSyncExternalStore");
export const isUseTransitionCall = flip(isHookCallWithName)("useTransition");
