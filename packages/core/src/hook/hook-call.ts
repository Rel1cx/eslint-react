import { is, NodeType, traverseUp } from "@eslint-react/ast";
import { isInitializedFromPragma } from "@eslint-react/jsx";
import { F } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { isValidReactHookName } from "./hook-name";

export function isReactHookCallWithName(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext, pragma: string) => {
    return match(node.callee)
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

export function unsafeIsInsideReactHookCall(node: TSESTree.Node): boolean {
  return !!traverseUp(node, n => is(NodeType.CallExpression)(n) && unsafeIsReactHookCall(n));
}
