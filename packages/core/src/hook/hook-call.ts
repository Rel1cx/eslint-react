import { NodeType } from "@eslint-react/ast";
import { isCallFromPragma, isInitializedFromPragma } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import { F, M } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { isValidReactHookName } from "./hook-name";

export function isReactHookCallWithName(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext, pragma: string) => {
    const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

    return M.match(node.callee)
      .with({ type: NodeType.Identifier, name }, n => isInitializedFromPragma(n.name, context, initialScope, pragma))
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

/**
 * Check if the given node is a React Hook call by its name.
 * @param node The node to check.
 * @returns `true` if the node is a React hook call, `false` otherwise.
 */
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

/**
 * TODO: Implement this function.
 * Check if the given node is a React Hook call by its name and its hierarchy.
 * @param node The node to check.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isReactHookCall(node: TSESTree.CallExpression) {
  // eslint-disable-next-line functional/no-throw-statements
  throw new Error("Not implemented");
}

export function isMemoOrForwardRefCall(node: TSESTree.Node, context: RuleContext) {
  return isCallFromPragma("memo")(node, context)
    || isCallFromPragma("forwardRef")(node, context);
}
