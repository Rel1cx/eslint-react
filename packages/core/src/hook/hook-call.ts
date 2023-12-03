import { NodeType } from "@eslint-react/ast";
import { isCallFromPragma, isInitializedFromPragma } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import { F, M } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { isValidReactHookName } from "./hook-name";

export function isReactHookCallWithName(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext, pragma: string) => {
    return M.match(node.callee)
      .with({ type: NodeType.Identifier, name }, n => isInitializedFromPragma(n.name, context, pragma))
      .with({ type: NodeType.MemberExpression, object: { name: pragma }, property: { name } }, F.constTrue)
      .otherwise(F.constFalse);
  };
}

export const isUseMemoCall = isReactHookCallWithName("useMemo");

export const isUseCallbackCall = isReactHookCallWithName("useCallback");

export const isUseEffectCall = isReactHookCallWithName("useEffect");

export const isUseLayoutEffectCall = isReactHookCallWithName("useLayoutEffect");

export const isUseRefCall = isReactHookCallWithName("useRef");

export const isUseStateCall = isReactHookCallWithName("useState");

export const isUseReducerCall = isReactHookCallWithName("useReducer");

export const isUseContextCall = isReactHookCallWithName("useContext");

export const isUseImperativeHandleCall = isReactHookCallWithName("useImperativeHandle");

export const isUseDebugValueCall = isReactHookCallWithName("useDebugValue");

export function unsafeIsReactHookCall(node: TSESTree.CallExpression) {
  if (node.callee.type === NodeType.Identifier) {
    return isValidReactHookName(node.callee.name);
  }

  if (node.callee.type === NodeType.MemberExpression) {
    return (
      node.callee.property.type === NodeType.Identifier
      && isValidReactHookName(node.callee.property.name)
    );
  }

  return false;
}

export function isMemoOrForwardRefCall(node: TSESTree.Node, context: RuleContext) {
  return isCallFromPragma("memo")(node, context) || isCallFromPragma("forwardRef")(node, context);
}
