/* eslint-disable function/function-return-boolean */
import type { RuleContext } from "@eslint-react/kit";
import * as AST from "@eslint-react/ast";
import { type _, dual } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

export declare namespace isReactAPI {
  type ReturnType = {
    (context: RuleContext, node: _ | null | TSESTree.Node): boolean;
    (context: RuleContext): (node: _ | null | TSESTree.Node) => boolean;
  };
}

export function isReactAPI(api: string): isReactAPI.ReturnType {
  return dual(2, (context: RuleContext, node: _ | null | TSESTree.Node) => {
    if (node == null) return false;
    const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
    const name = AST.stringify(node, getText);
    if (name === api) return true;
    if (name.substring(name.indexOf(".") + 1) === api) return true;
    return false;
  });
}

export function isReactAPICall(api: string): isReactAPI.ReturnType {
  return dual(2, (context: RuleContext, node: _ | null | TSESTree.Node) => {
    if (node == null) return false;
    if (node.type !== T.CallExpression) return false;
    return isReactAPI(api)(context, node.callee);
  });
}

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
