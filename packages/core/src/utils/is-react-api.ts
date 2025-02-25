import { isCallFromReact, isCallFromReactMember } from "./is-call-from-react";
import { isFromReact, isFromReactMember } from "./is-from-react";

export function isReactAPIWithName(name: string): ReturnType<typeof isFromReact>;
export function isReactAPIWithName(name: string, member: string): ReturnType<typeof isFromReactMember>;
export function isReactAPIWithName(name: string, member?: string) {
  return member != null
    ? isFromReactMember(name, member)
    : isFromReact(name);
}

export function isReactAPICallWithName(name: string): ReturnType<typeof isCallFromReact>;
export function isReactAPICallWithName(name: string, member: string): ReturnType<typeof isCallFromReactMember>;
export function isReactAPICallWithName(name: string, member?: string) {
  return member != null
    ? isCallFromReactMember(name, member)
    : isCallFromReact(name);
}

export const isChildrenCount = isReactAPIWithName("Children", "count");
export const isChildrenForEach = isReactAPIWithName("Children", "forEach");
export const isChildrenMap = isReactAPIWithName("Children", "map");
export const isChildrenOnly = isReactAPIWithName("Children", "only");
export const isChildrenToArray = isReactAPIWithName("Children", "toArray");
export const isCloneElement = isReactAPIWithName("cloneElement");
export const isCreateContext = isReactAPIWithName("createContext");
export const isCreateElement = isReactAPIWithName("createElement");
export const isCreateRef = isReactAPIWithName("createRef");
export const isForwardRef = isReactAPIWithName("forwardRef");
export const isMemo = isReactAPIWithName("memo");

export const isChildrenCountCall = isReactAPICallWithName("Children", "count");
export const isChildrenForEachCall = isReactAPICallWithName("Children", "forEach");
export const isChildrenMapCall = isReactAPICallWithName("Children", "map");
export const isChildrenOnlyCall = isReactAPICallWithName("Children", "only");
export const isChildrenToArrayCall = isReactAPICallWithName("Children", "toArray");
export const isCloneElementCall = isReactAPICallWithName("cloneElement");
export const isCreateContextCall = isReactAPICallWithName("createContext");
export const isCreateElementCall = isReactAPICallWithName("createElement");
export const isCreateRefCall = isReactAPICallWithName("createRef");
export const isForwardRefCall = isReactAPICallWithName("forwardRef");
export const isMemoCall = isReactAPICallWithName("memo");
