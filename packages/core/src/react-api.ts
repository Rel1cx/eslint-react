import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isReactAPICallWithName, isReactAPIWithName } from "./internal";

// Workaround for @typescript-eslint/utils's TS2742 error.
type A = (node: TSESTree.Identifier | TSESTree.MemberExpression, context: RuleContext) => boolean;
type B = (node: TSESTree.MemberExpression, context: RuleContext, pragma?: string) => boolean;
type X = (node: TSESTree.CallExpression, context: RuleContext) => boolean;
type Y = (node: TSESTree.CallExpression, context: RuleContext, pragma?: string) => boolean;

export const isChildrenCount: B = isReactAPIWithName("Children", "count");
export const isChildrenForEach: B = isReactAPIWithName("Children", "forEach");
export const isChildrenMap: B = isReactAPIWithName("Children", "map");
export const isChildrenOnly: B = isReactAPIWithName("Children", "only");
export const isChildrenToArray: B = isReactAPIWithName("Children", "toArray");
export const isCloneElement: A = isReactAPIWithName("cloneElement");
export const isCreateContext: A = isReactAPIWithName("createContext");
export const isCreateElement: A = isReactAPIWithName("createElement");
export const isCreateRef: A = isReactAPIWithName("createRef");
export const isForwardRef: A = isReactAPIWithName("forwardRef");
export const isMemo: A = isReactAPIWithName("memo");

export const isChildrenCountCall: Y = isReactAPICallWithName("Children", "count");
export const isChildrenForEachCall: Y = isReactAPICallWithName("Children", "forEach");
export const isChildrenMapCall: Y = isReactAPICallWithName("Children", "map");
export const isChildrenOnlyCall: Y = isReactAPICallWithName("Children", "only");
export const isChildrenToArrayCall: Y = isReactAPICallWithName("Children", "toArray");
export const isCloneElementCall: X = isReactAPICallWithName("cloneElement");
export const isCreateContextCall: X = isReactAPICallWithName("createContext");
export const isCreateElementCall: X = isReactAPICallWithName("createElement");
export const isCreateRefCall: X = isReactAPICallWithName("createRef");
export const isForwardRefCall: X = isReactAPICallWithName("forwardRef");
export const isMemoCall: X = isReactAPICallWithName("memo");
