import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import { unsafeDecodeSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isInitializedFromReact } from "../utils";
import { isReactHookName } from "./hook-name";

export function isReactHook(node: AST.TSESTreeFunction) {
  return F.pipe(
    AST.getFunctionIdentifier(node),
    O.flatMapNullable((id) => id.name),
    O.exists(isReactHookName),
  );
}

/**
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React Hook call, `false` otherwise.
 */
export function isReactHookCall(node: TSESTree.Node) {
  if (node.type !== T.CallExpression) return false;
  if (node.callee.type === T.Identifier) return isReactHookName(node.callee.name);
  if (node.callee.type === T.MemberExpression) {
    return node.callee.property.type === T.Identifier && isReactHookName(node.callee.property.name);
  }
  return false;
}

export function isReactHookCallWithName(node: TSESTree.CallExpression, context: RuleContext) {
  const settings = unsafeDecodeSettings(context.settings);
  return (name: string) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        return !settings.strictImportCheck
          || isInitializedFromReact(name, initialScope, settings.importSource);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return !settings.strictImportCheck
          || isInitializedFromReact(node.callee.object.name, initialScope, settings.importSource);
      default:
        return false;
    }
  };
}

export function isReactHookCallWithNameLoose(node: TSESTree.CallExpression) {
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
  return (node: TSESTree.CallExpression) => {
    const initialScope = context.sourceCode.getScope(node);
    switch (true) {
      case node.callee.type === T.Identifier
        && node.callee.name === name:
        return !settings.strictImportCheck
          || isInitializedFromReact(name, initialScope, settings.importSource);
      case node.callee.type === T.MemberExpression
        && node.callee.property.type === T.Identifier
        && node.callee.property.name === name
        && "name" in node.callee.object:
        return !settings.strictImportCheck
          || isInitializedFromReact(node.callee.object.name, initialScope, settings.importSource);
      default:
        return alias.some(isReactHookCallWithNameLoose(node));
    }
  };
}

export function isUseEffectCallLoose(node: TSESTree.Node) {
  if (node.type !== T.CallExpression) return false;
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
