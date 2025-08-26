import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { constFalse, flip } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/kit";
import { coerceSettings, DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../utils";
import { isReactHookName } from "./hook-name";

/**
 * Determines if a function node is a React Hook based on its name.
 * @param node The function node to check
 * @returns True if the function is a React Hook, false otherwise
 */
export function isReactHook(node: AST.TSESTreeFunction | unit) {
  if (node == null) return false;
  const id = AST.getFunctionId(node);
  return id?.name != null && isReactHookName(id.name);
}

/**
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isReactHookCall(node: TSESTree.Node | unit) {
  if (node == null) return false;
  if (node.type !== T.CallExpression) {
    return false;
  }
  if (node.callee.type === T.Identifier) {
    return isReactHookName(node.callee.name);
  }
  if (node.callee.type === T.MemberExpression) {
    return node.callee.property.type === T.Identifier && isReactHookName(node.callee.property.name);
  }
  return false;
}

/**
 * Checks if a node is a call to a specific React hook, with React import validation.
 * Returns a function that accepts a hook name to check against.
 * @param context The rule context
 * @param node The AST node to check
 * @returns A function that takes a hook name and returns boolean
 */
/* eslint-disable function/function-return-boolean */
export function isReactHookCallWithName(context: RuleContext, node: TSESTree.Node | unit) {
  if (node == null || node.type !== T.CallExpression) return constFalse;
  const {
    importSource = DEFAULT_ESLINT_REACT_SETTINGS.importSource,
    skipImportCheck = true,
  } = coerceSettings(context.settings);
  const initialScope = context.sourceCode.getScope(node);
  return (name: string) => {
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        return skipImportCheck || isInitializedFromReact(name, importSource, initialScope);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return skipImportCheck || isInitializedFromReact(node.callee.object.name, importSource, initialScope);
      default:
        return false;
    }
  };
}

/**
 * Lightweight version of isReactHookCallWithName that doesn't check imports.
 * @param node The AST node to check
 * @returns A function that takes a hook name and returns boolean
 */
export function isReactHookCallWithNameLoose(node: TSESTree.Node | unit) {
  if (node == null || node.type !== T.CallExpression) return constFalse;
  return (name: string) => {
    switch (node.callee.type) {
      case T.Identifier:
        return node.callee.name === name;
      case T.MemberExpression:
        return node.callee.property.type === T.Identifier && node.callee.property.name === name;
      default:
        return false;
    }
  };
}

/**
 * Checks if a node is a call to a specific React hook or one of its aliases.
 * @param context The rule context
 * @param name The primary hook name to check
 * @param alias Optional array of alias names to also accept
 * @returns Function that checks if a node matches the hook name or aliases
 */
export function isReactHookCallWithNameAlias(context: RuleContext, name: string, alias: unit | string[] = []) {
  const {
    importSource = DEFAULT_ESLINT_REACT_SETTINGS.importSource,
    skipImportCheck = true,
  } = coerceSettings(context.settings);
  return (node: TSESTree.CallExpression) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        return skipImportCheck || isInitializedFromReact(name, importSource, initialScope);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return skipImportCheck || isInitializedFromReact(node.callee.object.name, importSource, initialScope);
      default:
        return alias.some(isReactHookCallWithNameLoose(node));
    }
  };
}
/* eslint-enable function/function-return-boolean */

/**
 * Detects useEffect calls and variations (useLayoutEffect, etc.) using regex pattern.
 * @param node The AST node to check
 * @returns True if the node is a useEffect-like call
 */
export function isUseEffectCallLoose(node: TSESTree.Node | unit) {
  if (node == null) return false;
  if (node.type !== T.CallExpression) {
    return false;
  }
  switch (node.callee.type) {
    case T.Identifier:
      return /^use\w*Effect$/u.test(node.callee.name);
    case T.MemberExpression:
      return node.callee.property.type === T.Identifier
        && /^use\w*Effect$/u.test(node.callee.property.name);
    default:
      return false;
  }
}

// Utility functions for specific React hooks - each returns a function that checks if a node calls that specific hook
export const isUseCall = flip(isReactHookCallWithName)("use");
export const isUseActionStateCall = flip(isReactHookCallWithName)("useActionState");
export const isUseCallbackCall = flip(isReactHookCallWithName)("useCallback");
export const isUseContextCall = flip(isReactHookCallWithName)("useContext");
export const isUseDebugValueCall = flip(isReactHookCallWithName)("useDebugValue");
export const isUseDeferredValueCall = flip(isReactHookCallWithName)("useDeferredValue");
export const isUseEffectCall = flip(isReactHookCallWithName)("useEffect");
export const isUseFormStatusCall = flip(isReactHookCallWithName)("useFormStatus");
export const isUseIdCall = flip(isReactHookCallWithName)("useId");
export const isUseImperativeHandleCall = flip(isReactHookCallWithName)("useImperativeHandle");
export const isUseInsertionEffectCall = flip(isReactHookCallWithName)("useInsertionEffect");
export const isUseLayoutEffectCall = flip(isReactHookCallWithName)("useLayoutEffect");
export const isUseMemoCall = flip(isReactHookCallWithName)("useMemo");
export const isUseOptimisticCall = flip(isReactHookCallWithName)("useOptimistic");
export const isUseReducerCall = flip(isReactHookCallWithName)("useReducer");
export const isUseRefCall = flip(isReactHookCallWithName)("useRef");
export const isUseStateCall = flip(isReactHookCallWithName)("useState");
export const isUseSyncExternalStoreCall = flip(isReactHookCallWithName)("useSyncExternalStore");
export const isUseTransitionCall = flip(isReactHookCallWithName)("useTransition");
