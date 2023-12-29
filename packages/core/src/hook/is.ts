import { getFunctionIdentifier, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { isInitializedFromPragma } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

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
  if (node.callee.type === NodeType.Identifier) {
    return isReactHookName(node.callee.name);
  }

  if (node.callee.type === NodeType.MemberExpression) {
    return (
      node.callee.property.type === NodeType.Identifier
      && isReactHookName(node.callee.property.name)
    );
  }

  return false;
}

export function isReactHookCallWithName(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext, pragma: string) => {
    const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

    return match(node.callee)
      .with({ type: NodeType.Identifier, name }, n => isInitializedFromPragma(n.name, context, initialScope, pragma))
      .with({ type: NodeType.MemberExpression, object: { name: pragma }, property: { name } }, F.constTrue)
      .otherwise(F.constFalse);
  };
}

export function isReactHookCallWithNameLoose(name: string) {
  return (node: TSESTree.CallExpression) => {
    return match(node.callee)
      .with({ type: NodeType.Identifier, name }, F.constTrue)
      .with({ type: NodeType.MemberExpression, property: { name } }, F.constTrue)
      .otherwise(F.constFalse);
  };
}

export const isUseCallbackCall = isReactHookCallWithName("useCallback");
export const isUseContextCall = isReactHookCallWithName("useContext");
export const isUseDebugValueCall = isReactHookCallWithName("useDebugValue");
export const isUseDeferredValueCall = isReactHookCallWithName("useDeferredValue");
export const isUseEffectCall = isReactHookCallWithName("useEffect");
export const isUseIdCall = isReactHookCallWithName("useId");
export const isUseImperativeHandleCall = isReactHookCallWithName("useImperativeHandle");
export const isUseInsertionEffectCall = isReactHookCallWithName("useInsertionEffect");
export const isUseLayoutEffectCall = isReactHookCallWithName("useLayoutEffect");
export const isUseMemoCall = isReactHookCallWithName("useMemo");
export const isUseReducerCall = isReactHookCallWithName("useReducer");
export const isUseRefCall = isReactHookCallWithName("useRef");
export const isUseStateCall = isReactHookCallWithName("useState");
export const isUseSyncExternalStoreCall = isReactHookCallWithName("useSyncExternalStore");
export const isUseTransitionCall = isReactHookCallWithName("useTransition");
