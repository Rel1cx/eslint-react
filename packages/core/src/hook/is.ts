import * as AST from "@eslint-react/ast";
import { _, constFalse, flip } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { unsafeDecodeSettings } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../utils";
import { isReactHookName } from "./hook-name";

export function isReactHook(node: AST.TSESTreeFunction | _) {
  if (node == null) return _;
  const id = AST.getFunctionIdentifier(node);
  return id?.name != null && isReactHookName(id.name);
}

/**
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isReactHookCall(node: TSESTree.Node | _) {
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

export function isReactHookCallWithName(node: TSESTree.CallExpression | _, context: RuleContext) {
  if (node == null) return constFalse;
  const settings = unsafeDecodeSettings(context.settings);
  const importSource = settings.importSource ?? "react";
  const initialScope = context.sourceCode.getScope(node);
  return (name: string) => {
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return !settings.strictImportCheck
          || isInitializedFromReact(name, importSource, initialScope);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return !settings.strictImportCheck
          || isInitializedFromReact(node.callee.object.name, importSource, initialScope);
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameLoose(node: TSESTree.CallExpression | _) {
  if (node == null) return constFalse;
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

export function isReactHookCallWithNameAlias(name: string, context: RuleContext, alias: string[]) {
  const settings = unsafeDecodeSettings(context);
  const importSource = settings.importSource ?? "react";
  return (node: TSESTree.CallExpression) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return !settings.strictImportCheck
          || isInitializedFromReact(name, importSource, initialScope);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return !settings.strictImportCheck
          || isInitializedFromReact(node.callee.object.name, importSource, initialScope);
      default:
        return alias.some(isReactHookCallWithNameLoose(node));
    }
  };
}

export function isUseEffectCallLoose(node: TSESTree.Node | _) {
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

export const isUseCall = flip(isReactHookCallWithName)("use");
export const isUseCallbackCall = flip(isReactHookCallWithName)("useCallback");
export const isUseContextCall = flip(isReactHookCallWithName)("useContext");
export const isUseDebugValueCall = flip(isReactHookCallWithName)("useDebugValue");
export const isUseDeferredValueCall = flip(isReactHookCallWithName)("useDeferredValue");
export const isUseEffectCall = flip(isReactHookCallWithName)("useEffect");
export const isUseIdCall = flip(isReactHookCallWithName)("useId");
export const isUseImperativeHandleCall = flip(isReactHookCallWithName)("useImperativeHandle");
export const isUseInsertionEffectCall = flip(isReactHookCallWithName)("useInsertionEffect");
export const isUseLayoutEffectCall = flip(isReactHookCallWithName)("useLayoutEffect");
export const isUseMemoCall = flip(isReactHookCallWithName)("useMemo");
export const isUseReducerCall = flip(isReactHookCallWithName)("useReducer");
export const isUseRefCall = flip(isReactHookCallWithName)("useRef");
export const isUseStateCall = flip(isReactHookCallWithName)("useState");
export const isUseSyncExternalStoreCall = flip(isReactHookCallWithName)("useSyncExternalStore");
export const isUseTransitionCall = flip(isReactHookCallWithName)("useTransition");
