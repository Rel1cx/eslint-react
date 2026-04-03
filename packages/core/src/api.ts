import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { resolveImportSource } from "@eslint-react/var";
import { dual } from "@local/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export declare namespace isAPI {
  type ReturnType = {
    (context: RuleContext, node: null | TSESTree.Node): boolean;
    (context: RuleContext): (node: null | TSESTree.Node) => boolean;
  };
}

/**
 * Check if the node is a React API identifier or member expression
 * @param api The React API name to check against (ex: "useState", "React.memo")
 * @returns A predicate function to check if a node matches the API
 */
export function isAPI(api: string): isAPI.ReturnType {
  const func = (context: RuleContext, node: null | TSESTree.Node) => {
    if (node == null) return false;
    const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
    const name = ast.getFullyQualifiedName(node, getText);
    if (name === api) return true;
    if (name.endsWith(`.${api}`)) return true;
    return false;
  };
  return dual(2, func);
}

export declare namespace isAPICall {
  type ReturnType = {
    (context: RuleContext, node: null | TSESTree.Node): node is TSESTree.CallExpression;
    (context: RuleContext): (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
  };
}

/**
 * Check if the node is a call expression to a specific React API
 * @param api The React API name to check against
 * @returns A predicate function to check if a node is a call to the API
 */
export function isAPICall(api: string): isAPICall.ReturnType {
  const func = (context: RuleContext, node: null | TSESTree.Node): node is TSESTree.CallExpression => {
    if (node == null) return false;
    if (node.type !== AST.CallExpression) return false;
    return isAPI(api)(context, ast.getUnderlyingExpression(node.callee));
  };
  return dual(2, func);
}

/**
 * Check if a variable is initialized from React import
 * @param name The variable name
 * @param initialScope The initial scope
 * @param importSource Alternative import source of React (ex: "preact/compat")
 * @returns True if the variable is initialized or derived from React import
 */
export function isAPIFromReact(
  name: string,
  initialScope: Scope,
  importSource = "react",
) {
  return name.toLowerCase() === "react" || Boolean(resolveImportSource(name, initialScope)?.startsWith(importSource));
}

/**
 * if a variable is initialized from React Native import
 * @param name The variable name
 * @param initialScope The initial scope
 * @param importSource Alternative import source of React Native (ex: "react-native-web")
 * @returns True if the variable is initialized from React Native import
 */
export function isAPIFromReactNative(
  name: string,
  initialScope: Scope,
  importSource = "react-native",
) {
  return [
    "react_native",
    "reactnative",
    "rn",
  ].includes(name.toLowerCase()) || Boolean(resolveImportSource(name, initialScope)?.startsWith(importSource));
}

// React API checks
export const isCaptureOwnerStack = isAPI("captureOwnerStack");
export const isChildrenCount = isAPI("Children.count");
export const isChildrenForEach = isAPI("Children.forEach");
export const isChildrenMap = isAPI("Children.map");
export const isChildrenOnly = isAPI("Children.only");
export const isChildrenToArray = isAPI("Children.toArray");
export const isCloneElement = isAPI("cloneElement");
export const isCreateContext = isAPI("createContext");
export const isCreateElement = isAPI("createElement");
export const isCreateRef = isAPI("createRef");
export const isForwardRef = isAPI("forwardRef");
export const isMemo = isAPI("memo");
export const isLazy = isAPI("lazy");

// React API Call checks
export const isCaptureOwnerStackCall = isAPICall("captureOwnerStack");
export const isChildrenCountCall = isAPICall("Children.count");
export const isChildrenForEachCall = isAPICall("Children.forEach");
export const isChildrenMapCall = isAPICall("Children.map");
export const isChildrenOnlyCall = isAPICall("Children.only");
export const isChildrenToArrayCall = isAPICall("Children.toArray");
export const isCloneElementCall = isAPICall("cloneElement");
export const isCreateContextCall = isAPICall("createContext");
export const isCreateElementCall = isAPICall("createElement");
export const isCreateRefCall = isAPICall("createRef");
export const isForwardRefCall = isAPICall("forwardRef");
export const isMemoCall = isAPICall("memo");
export const isLazyCall = isAPICall("lazy");

// React Hook API checks

export const isUse = isAPI("use");
export const isUseActionState = isAPI("useActionState");
export const isUseCallback = isAPI("useCallback");
export const isUseContext = isAPI("useContext");
export const isUseDebugValue = isAPI("useDebugValue");
export const isUseDeferredValue = isAPI("useDeferredValue");
export const isUseEffect = isAPI("useEffect");
export const isUseFormStatus = isAPI("useFormStatus");
export const isUseId = isAPI("useId");
export const isUseImperativeHandle = isAPI("useImperativeHandle");
export const isUseInsertionEffect = isAPI("useInsertionEffect");
export const isUseLayoutEffect = isAPI("useLayoutEffect");
export const isUseMemo = isAPI("useMemo");
export const isUseOptimistic = isAPI("useOptimistic");
export const isUseReducer = isAPI("useReducer");
export const isUseRef = isAPI("useRef");
export const isUseState = isAPI("useState");
export const isUseSyncExternalStore = isAPI("useSyncExternalStore");
export const isUseTransition = isAPI("useTransition");

export const isUseCall = isAPICall("use");
export const isUseActionStateCall = isAPICall("useActionState");
export const isUseCallbackCall = isAPICall("useCallback");
export const isUseContextCall = isAPICall("useContext");
export const isUseDebugValueCall = isAPICall("useDebugValue");
export const isUseDeferredValueCall = isAPICall("useDeferredValue");
export const isUseEffectCall = isAPICall("useEffect");
export const isUseFormStatusCall = isAPICall("useFormStatus");
export const isUseIdCall = isAPICall("useId");
export const isUseImperativeHandleCall = isAPICall("useImperativeHandle");
export const isUseInsertionEffectCall = isAPICall("useInsertionEffect");
export const isUseLayoutEffectCall = isAPICall("useLayoutEffect");
export const isUseMemoCall = isAPICall("useMemo");
export const isUseOptimisticCall = isAPICall("useOptimistic");
export const isUseReducerCall = isAPICall("useReducer");
export const isUseRefCall = isAPICall("useRef");
export const isUseStateCall = isAPICall("useState");
export const isUseSyncExternalStoreCall = isAPICall("useSyncExternalStore");
export const isUseTransitionCall = isAPICall("useTransition");
