import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../internal/is-from-react";
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
  if (node.callee.type === NodeType.Identifier) return isReactHookName(node.callee.name);
  if (node.callee.type === NodeType.MemberExpression) {
    return node.callee.property.type === NodeType.Identifier && isReactHookName(node.callee.property.name);
  }
  return false;
}

export function isReactHookCallWithName(node: TSESTree.CallExpression, context: RuleContext) {
  return (name: string) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === NodeType.Identifier
        && node.callee.name === name:
        return isInitializedFromReact(name, context, initialScope);
      case node.callee.type === NodeType.MemberExpression
        && node.callee.property.type === NodeType.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return isInitializedFromReact(node.callee.object.name, context, initialScope);
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameLoose(node: TSESTree.CallExpression) {
  return (name: string) => {
    switch (node.callee.type) {
      case NodeType.Identifier:
        return node.callee.name === name;
      case NodeType.MemberExpression:
        return node.callee.property.type === NodeType.Identifier && node.callee.property.name === name;
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameAlias(name: string, context: RuleContext, alias: string[]) {
  return (node: TSESTree.CallExpression) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === NodeType.Identifier
        && node.callee.name === name:
        return isInitializedFromReact(name, context, initialScope);
      case node.callee.type === NodeType.MemberExpression
        && node.callee.property.type === NodeType.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return isInitializedFromReact(node.callee.object.name, context, initialScope);
      default:
        return alias.some(isReactHookCallWithNameLoose(node));
    }
  };
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
