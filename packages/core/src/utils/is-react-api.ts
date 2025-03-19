import { isCallFromReact, isCallFromReactObject, isFromReact, isFromReactObject } from "./is-from-react";

export function isReactAPI(name: string): ReturnType<typeof isFromReact>;
export function isReactAPI(objectName: string, propertyName: string): ReturnType<typeof isFromReactObject>;
export function isReactAPI(arg0: string, arg1?: string) {
  return arg1 == null
    ? isFromReact(arg0)
    : isFromReactObject(arg0, arg1);
}

export function isReactAPICall(name: string): ReturnType<typeof isCallFromReact>;
export function isReactAPICall(
  objectName: string,
  propertyName: string,
): ReturnType<typeof isCallFromReactObject>;
export function isReactAPICall(arg0: string, arg1?: string) {
  return arg1 == null
    ? isCallFromReact(arg0)
    : isCallFromReactObject(arg0, arg1);
}

export const isChildrenCount = isReactAPI("Children", "count");
export const isChildrenForEach = isReactAPI("Children", "forEach");
export const isChildrenMap = isReactAPI("Children", "map");
export const isChildrenOnly = isReactAPI("Children", "only");
export const isChildrenToArray = isReactAPI("Children", "toArray");
export const isCloneElement = isReactAPI("cloneElement");
export const isCreateContext = isReactAPI("createContext");
export const isCreateElement = isReactAPI("createElement");
export const isCreateRef = isReactAPI("createRef");
export const isForwardRef = isReactAPI("forwardRef");
export const isMemo = isReactAPI("memo");

export const isChildrenCountCall = isReactAPICall("Children", "count");
export const isChildrenForEachCall = isReactAPICall("Children", "forEach");
export const isChildrenMapCall = isReactAPICall("Children", "map");
export const isChildrenOnlyCall = isReactAPICall("Children", "only");
export const isChildrenToArrayCall = isReactAPICall("Children", "toArray");
export const isCloneElementCall = isReactAPICall("cloneElement");
export const isCreateContextCall = isReactAPICall("createContext");
export const isCreateElementCall = isReactAPICall("createElement");
export const isCreateRefCall = isReactAPICall("createRef");
export const isForwardRefCall = isReactAPICall("forwardRef");
export const isMemoCall = isReactAPICall("memo");
