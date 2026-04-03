import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { dual } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export declare namespace isReactAPI {
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
export function isReactAPI(api: string): isReactAPI.ReturnType {
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

export declare namespace isReactAPICall {
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
export function isReactAPICall(api: string): isReactAPICall.ReturnType {
  const func = (context: RuleContext, node: null | TSESTree.Node): node is TSESTree.CallExpression => {
    if (node == null) return false;
    if (node.type !== AST.CallExpression) return false;
    return isReactAPI(api)(context, ast.getUnderlyingExpression(node.callee));
  };
  return dual(2, func);
}

// React API checks
export const isCaptureOwnerStack = isReactAPI("captureOwnerStack");
export const isChildrenCount = isReactAPI("Children.count");
export const isChildrenForEach = isReactAPI("Children.forEach");
export const isChildrenMap = isReactAPI("Children.map");
export const isChildrenOnly = isReactAPI("Children.only");
export const isChildrenToArray = isReactAPI("Children.toArray");
export const isCloneElement = isReactAPI("cloneElement");
export const isCreateContext = isReactAPI("createContext");
export const isCreateElement = isReactAPI("createElement");
export const isCreateRef = isReactAPI("createRef");
export const isForwardRef = isReactAPI("forwardRef");
export const isMemo = isReactAPI("memo");
export const isLazy = isReactAPI("lazy");

// React API Call checks
export const isCaptureOwnerStackCall = isReactAPICall("captureOwnerStack");
export const isChildrenCountCall = isReactAPICall("Children.count");
export const isChildrenForEachCall = isReactAPICall("Children.forEach");
export const isChildrenMapCall = isReactAPICall("Children.map");
export const isChildrenOnlyCall = isReactAPICall("Children.only");
export const isChildrenToArrayCall = isReactAPICall("Children.toArray");
export const isCloneElementCall = isReactAPICall("cloneElement");
export const isCreateContextCall = isReactAPICall("createContext");
export const isCreateElementCall = isReactAPICall("createElement");
export const isCreateRefCall = isReactAPICall("createRef");
export const isForwardRefCall = isReactAPICall("forwardRef");
export const isMemoCall = isReactAPICall("memo");
export const isLazyCall = isReactAPICall("lazy");

// React Hook API checks
export const isUseCall = isReactAPICall("use");
export const isUseActionStateCall = isReactAPICall("useActionState");
export const isUseCallbackCall = isReactAPICall("useCallback");
export const isUseContextCall = isReactAPICall("useContext");
export const isUseDebugValueCall = isReactAPICall("useDebugValue");
export const isUseDeferredValueCall = isReactAPICall("useDeferredValue");
export const isUseEffectCall = isReactAPICall("useEffect");
export const isUseFormStatusCall = isReactAPICall("useFormStatus");
export const isUseIdCall = isReactAPICall("useId");
export const isUseImperativeHandleCall = isReactAPICall("useImperativeHandle");
export const isUseInsertionEffectCall = isReactAPICall("useInsertionEffect");
export const isUseLayoutEffectCall = isReactAPICall("useLayoutEffect");
export const isUseMemoCall = isReactAPICall("useMemo");
export const isUseOptimisticCall = isReactAPICall("useOptimistic");
export const isUseReducerCall = isReactAPICall("useReducer");
export const isUseRefCall = isReactAPICall("useRef");
export const isUseStateCall = isReactAPICall("useState");
export const isUseSyncExternalStoreCall = isReactAPICall("useSyncExternalStore");
export const isUseTransitionCall = isReactAPICall("useTransition");
