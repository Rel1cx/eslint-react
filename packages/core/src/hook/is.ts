import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier } from "@eslint-react/ast";
import { unsafeReadSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../internal";
import { isReactHookName } from "./hook-name";

export function isReactHook(node: TSESTreeFunction) {
  return F.pipe(
    getFunctionIdentifier(node),
    O.flatMapNullable((id) => id.name),
    O.exists(isReactHookName),
  );
}

/**
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isReactHookCall(node: TSESTree.CallExpression) {
  if (node.callee.type === AST_NODE_TYPES.Identifier) return isReactHookName(node.callee.name);
  if (node.callee.type === AST_NODE_TYPES.MemberExpression) {
    return node.callee.property.type === AST_NODE_TYPES.Identifier && isReactHookName(node.callee.property.name);
  }
  return false;
}

export function isReactHookCallWithName(node: TSESTree.CallExpression, context: RuleContext) {
  const settings = unsafeReadSettings(context.settings);
  return (name: string) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === AST_NODE_TYPES.Identifier
        && node.callee.name === name:
        return isInitializedFromReact(name, initialScope, settings);
      case node.callee.type === AST_NODE_TYPES.MemberExpression
        && node.callee.property.type === AST_NODE_TYPES.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return isInitializedFromReact(node.callee.object.name, initialScope, settings);
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameLoose(node: TSESTree.CallExpression) {
  return (name: string) => {
    switch (node.callee.type) {
      case AST_NODE_TYPES.Identifier:
        return node.callee.name === name;
      case AST_NODE_TYPES.MemberExpression:
        return node.callee.property.type === AST_NODE_TYPES.Identifier && node.callee.property.name === name;
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameAlias(name: string, context: RuleContext, alias: string[]) {
  const settings = unsafeReadSettings(context.settings);
  return (node: TSESTree.CallExpression) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === AST_NODE_TYPES.Identifier
        && node.callee.name === name:
        return isInitializedFromReact(name, initialScope, settings);
      case node.callee.type === AST_NODE_TYPES.MemberExpression
        && node.callee.property.type === AST_NODE_TYPES.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return isInitializedFromReact(node.callee.object.name, initialScope, settings);
      default:
        return alias.some(isReactHookCallWithNameLoose(node));
    }
  };
}

export function isUseEffectCallLoose(node: TSESTree.Node) {
  if (node.type !== AST_NODE_TYPES.CallExpression) return false;
  switch (node.callee.type) {
    case AST_NODE_TYPES.Identifier:
      return /^use\w*Effect$/u.test(node.callee.name);
    case AST_NODE_TYPES.MemberExpression:
      return node.callee.property.type === AST_NODE_TYPES.Identifier
        && /^use\w*Effect$/u.test(node.callee.property.name);
    default:
      return false;
  }
}

export const isUseCallbackCall = F.flip(isReactHookCallWithName)("useCallback");
export const isUseContextCall = F.flip(isReactHookCallWithName)("useContext");
export const isUseDebugValueCall = F.flip(isReactHookCallWithName)("useDebugValue");
export const isUseDeferredValueCall = F.flip(isReactHookCallWithName)("useDeferredValue");
export const isUseEffectCall = F.flip(isReactHookCallWithName)("useEffect");
export const isUseIdCall = F.flip(isReactHookCallWithName)("useId");
export const isUseImperativeHandleCall = F.flip(isReactHookCallWithName)("useImperativeHandle");
export const isUseInsertionEffectCall = F.flip(isReactHookCallWithName)("useInsertionEffect");
export const isUseLayoutEffectCall = F.flip(isReactHookCallWithName)("useLayoutEffect");
export const isUseMemoCall = F.flip(isReactHookCallWithName)("useMemo");
export const isUseReducerCall = F.flip(isReactHookCallWithName)("useReducer");
export const isUseRefCall = F.flip(isReactHookCallWithName)("useRef");
export const isUseStateCall = F.flip(isReactHookCallWithName)("useState");
export const isUseSyncExternalStoreCall = F.flip(isReactHookCallWithName)("useSyncExternalStore");
export const isUseTransitionCall = F.flip(isReactHookCallWithName)("useTransition");
