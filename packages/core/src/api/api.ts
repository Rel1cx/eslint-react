import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactAPI, isReactAPICall } from "../internal";

// Workaround for @typescript-eslint/utils's TS2742 error.
type A = (node: TSESTree.Identifier | TSESTree.MemberExpression, context: RuleContext) => boolean;
type B = (node: TSESTree.MemberExpression, context: RuleContext, pragma?: string) => boolean;
type X = (node: TSESTree.CallExpression, context: RuleContext) => boolean;
type Y = (node: TSESTree.CallExpression, context: RuleContext, pragma?: string) => boolean;

export const isChildrenCount: B = isReactAPI("Children", "count");
export const isChildrenForEach: B = isReactAPI("Children", "forEach");
export const isChildrenMap: B = isReactAPI("Children", "map");
export const isChildrenOnly: B = isReactAPI("Children", "only");
export const isChildrenToArray: B = isReactAPI("Children", "toArray");
export const isCloneElement: A = isReactAPI("cloneElement");
export const isCreateContext: A = isReactAPI("createContext");
export const isCreateElement: A = isReactAPI("createElement");
export const isCreateRef: A = isReactAPI("createRef");
export const isForwardRef: A = isReactAPI("forwardRef");
export const isMemo: A = isReactAPI("memo");

export const isChildrenCountCall: Y = isReactAPICall("Children", "count");
export const isChildrenForEachCall: Y = isReactAPICall("Children", "forEach");
export const isChildrenMapCall: Y = isReactAPICall("Children", "map");
export const isChildrenOnlyCall: Y = isReactAPICall("Children", "only");
export const isChildrenToArrayCall: Y = isReactAPICall("Children", "toArray");
export const isCloneElementCall: X = isReactAPICall("cloneElement");
export const isCreateContextCall: X = isReactAPICall("createContext");
export const isCreateElementCall: X = isReactAPICall("createElement");
export const isCreateRefCall: X = isReactAPICall("createRef");
export const isForwardRefCall: X = isReactAPICall("forwardRef");
export const isMemoCall: X = isReactAPICall("memo");
