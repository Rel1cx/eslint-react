import { Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { dual } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export declare namespace isAPI {
  /** The dual-signature predicate type returned by {@link isAPI}. */
  type ReturnType = {
    (context: RuleContext, node: null | TSESTree.Node): boolean;
    (context: RuleContext): (node: null | TSESTree.Node) => boolean;
  };
}

/**
 * Check if the node is a React API identifier or member expression.
 * @param api The React API name to check against (ex: "useState", "React.memo").
 * @returns A predicate function to check if a node matches the API.
 */
export function isAPI(api: string): isAPI.ReturnType {
  const func = (context: RuleContext, node: null | TSESTree.Node) => {
    if (node == null) return false;
    const expr = Extract.unwrap(node);
    const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
    // Get the fully qualified name of the unwrapped expression
    const name = Extract.getFullyQualifiedName(expr, getText);
    // Check if the fully qualified name equals the API
    if (name === api) return true;
    // Check if the fully qualified name ends with `.${api}`
    if (name.endsWith(`.${api}`)) return true;
    return false;
  };
  return dual(2, func);
}

export declare namespace isAPICall {
  /** The dual-signature predicate type returned by {@link isAPICall}. */
  type ReturnType = {
    (context: RuleContext, node: null | TSESTree.Node): node is TSESTree.CallExpression;
    (context: RuleContext): (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
  };
}

/**
 * Check if the node is a call expression to a specific React API.
 * @param api The React API name to check against.
 * @returns A predicate function to check if a node is a call to the API.
 */
export function isAPICall(api: string): isAPICall.ReturnType {
  const func = (context: RuleContext, node: null | TSESTree.Node): node is TSESTree.CallExpression => {
    if (node == null) return false;
    if (node.type !== AST.CallExpression) return false;
    return isAPI(api)(context, Extract.unwrap(node.callee));
  };
  return dual(2, func);
}

// React API checks
/** Check if the node is a React `captureOwnerStack` API identifier or member expression. */
export const isCaptureOwnerStack = isAPI("captureOwnerStack");
/** Check if the node is a React `Children.count` API identifier or member expression. */
export const isChildrenCount = isAPI("Children.count");
/** Check if the node is a React `Children.forEach` API identifier or member expression. */
export const isChildrenForEach = isAPI("Children.forEach");
/** Check if the node is a React `Children.map` API identifier or member expression. */
export const isChildrenMap = isAPI("Children.map");
/** Check if the node is a React `Children.only` API identifier or member expression. */
export const isChildrenOnly = isAPI("Children.only");
/** Check if the node is a React `Children.toArray` API identifier or member expression. */
export const isChildrenToArray = isAPI("Children.toArray");
/** Check if the node is a React `cloneElement` API identifier or member expression. */
export const isCloneElement = isAPI("cloneElement");
/** Check if the node is a React `createContext` API identifier or member expression. */
export const isCreateContext = isAPI("createContext");
/** Check if the node is a React `createElement` API identifier or member expression. */
export const isCreateElement = isAPI("createElement");
/** Check if the node is a React `createRef` API identifier or member expression. */
export const isCreateRef = isAPI("createRef");
/** Check if the node is a React `forwardRef` API identifier or member expression. */
export const isForwardRef = isAPI("forwardRef");
/** Check if the node is a React `memo` API identifier or member expression. */
export const isMemo = isAPI("memo");
/** Check if the node is a React `lazy` API identifier or member expression. */
export const isLazy = isAPI("lazy");

// React API Call checks
/** Check if the node is a call expression to the React `captureOwnerStack` API. */
export const isCaptureOwnerStackCall = isAPICall("captureOwnerStack");
/** Check if the node is a call expression to the React `Children.count` API. */
export const isChildrenCountCall = isAPICall("Children.count");
/** Check if the node is a call expression to the React `Children.forEach` API. */
export const isChildrenForEachCall = isAPICall("Children.forEach");
/** Check if the node is a call expression to the React `Children.map` API. */
export const isChildrenMapCall = isAPICall("Children.map");
/** Check if the node is a call expression to the React `Children.only` API. */
export const isChildrenOnlyCall = isAPICall("Children.only");
/** Check if the node is a call expression to the React `Children.toArray` API. */
export const isChildrenToArrayCall = isAPICall("Children.toArray");
/** Check if the node is a call expression to the React `cloneElement` API. */
export const isCloneElementCall = isAPICall("cloneElement");
/** Check if the node is a call expression to the React `createContext` API. */
export const isCreateContextCall = isAPICall("createContext");
/** Check if the node is a call expression to the React `createElement` API. */
export const isCreateElementCall = isAPICall("createElement");
/** Check if the node is a call expression to the React `createRef` API. */
export const isCreateRefCall = isAPICall("createRef");
/** Check if the node is a call expression to the React `forwardRef` API. */
export const isForwardRefCall = isAPICall("forwardRef");
/** Check if the node is a call expression to the React `memo` API. */
export const isMemoCall = isAPICall("memo");
/** Check if the node is a call expression to the React `lazy` API. */
export const isLazyCall = isAPICall("lazy");

// React Hook API checks
/** Check if the node is a React `use` API identifier or member expression. */
export const isUse = isAPI("use");
/** Check if the node is a React `useActionState` API identifier or member expression. */
export const isUseActionState = isAPI("useActionState");
/** Check if the node is a React `useCallback` API identifier or member expression. */
export const isUseCallback = isAPI("useCallback");
/** Check if the node is a React `useContext` API identifier or member expression. */
export const isUseContext = isAPI("useContext");
/** Check if the node is a React `useDebugValue` API identifier or member expression. */
export const isUseDebugValue = isAPI("useDebugValue");
/** Check if the node is a React `useDeferredValue` API identifier or member expression. */
export const isUseDeferredValue = isAPI("useDeferredValue");
/** Check if the node is a React `useEffect` API identifier or member expression. */
export const isUseEffect = isAPI("useEffect");
/** Check if the node is a React `useFormStatus` API identifier or member expression. */
export const isUseFormStatus = isAPI("useFormStatus");
/** Check if the node is a React `useId` API identifier or member expression. */
export const isUseId = isAPI("useId");
/** Check if the node is a React `useImperativeHandle` API identifier or member expression. */
export const isUseImperativeHandle = isAPI("useImperativeHandle");
/** Check if the node is a React `useInsertionEffect` API identifier or member expression. */
export const isUseInsertionEffect = isAPI("useInsertionEffect");
/** Check if the node is a React `useLayoutEffect` API identifier or member expression. */
export const isUseLayoutEffect = isAPI("useLayoutEffect");
/** Check if the node is a React `useMemo` API identifier or member expression. */
export const isUseMemo = isAPI("useMemo");
/** Check if the node is a React `useOptimistic` API identifier or member expression. */
export const isUseOptimistic = isAPI("useOptimistic");
/** Check if the node is a React `useReducer` API identifier or member expression. */
export const isUseReducer = isAPI("useReducer");
/** Check if the node is a React `useRef` API identifier or member expression. */
export const isUseRef = isAPI("useRef");
/** Check if the node is a React `useState` API identifier or member expression. */
export const isUseState = isAPI("useState");
/** Check if the node is a React `useSyncExternalStore` API identifier or member expression. */
export const isUseSyncExternalStore = isAPI("useSyncExternalStore");
/** Check if the node is a React `useTransition` API identifier or member expression. */
export const isUseTransition = isAPI("useTransition");

// React Hook API Call checks
/** Check if the node is a call expression to the React `use` API. */
export const isUseCall = isAPICall("use");
/** Check if the node is a call expression to the React `useActionState` API. */
export const isUseActionStateCall = isAPICall("useActionState");
/** Check if the node is a call expression to the React `useCallback` API. */
export const isUseCallbackCall = isAPICall("useCallback");
/** Check if the node is a call expression to the React `useContext` API. */
export const isUseContextCall = isAPICall("useContext");
/** Check if the node is a call expression to the React `useDebugValue` API. */
export const isUseDebugValueCall = isAPICall("useDebugValue");
/** Check if the node is a call expression to the React `useDeferredValue` API. */
export const isUseDeferredValueCall = isAPICall("useDeferredValue");
/** Check if the node is a call expression to the React `useEffect` API. */
export const isUseEffectCall = isAPICall("useEffect");
/** Check if the node is a call expression to the React `useFormStatus` API. */
export const isUseFormStatusCall = isAPICall("useFormStatus");
/** Check if the node is a call expression to the React `useId` API. */
export const isUseIdCall = isAPICall("useId");
/** Check if the node is a call expression to the React `useImperativeHandle` API. */
export const isUseImperativeHandleCall = isAPICall("useImperativeHandle");
/** Check if the node is a call expression to the React `useInsertionEffect` API. */
export const isUseInsertionEffectCall = isAPICall("useInsertionEffect");
/** Check if the node is a call expression to the React `useLayoutEffect` API. */
export const isUseLayoutEffectCall = isAPICall("useLayoutEffect");
/** Check if the node is a call expression to the React `useMemo` API. */
export const isUseMemoCall = isAPICall("useMemo");
/** Check if the node is a call expression to the React `useOptimistic` API. */
export const isUseOptimisticCall = isAPICall("useOptimistic");
/** Check if the node is a call expression to the React `useReducer` API. */
export const isUseReducerCall = isAPICall("useReducer");
/** Check if the node is a call expression to the React `useRef` API. */
export const isUseRefCall = isAPICall("useRef");
/** Check if the node is a call expression to the React `useState` API. */
export const isUseStateCall = isAPICall("useState");
/** Check if the node is a call expression to the React `useSyncExternalStore` API. */
export const isUseSyncExternalStoreCall = isAPICall("useSyncExternalStore");
/** Check if the node is a call expression to the React `useTransition` API. */
export const isUseTransitionCall = isAPICall("useTransition");
