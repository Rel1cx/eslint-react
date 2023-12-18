import { isCallFromPragma, isCallFromPragmaMember, isFromPragma, isFromPragmaMember } from "@eslint-react/jsx";

export function isReactAPI(name: string): ReturnType<typeof isFromPragma>;
export function isReactAPI(name: string, member: string): ReturnType<typeof isFromPragmaMember>;
export function isReactAPI(name: string, member?: string) {
  return member
    ? isFromPragmaMember(name, member)
    : isFromPragma(name);
}

export function isReactAPICall(name: string): ReturnType<typeof isCallFromPragma>;
export function isReactAPICall(name: string, member: string): ReturnType<typeof isCallFromPragmaMember>;
export function isReactAPICall(name: string, member?: string) {
  return member
    ? isCallFromPragmaMember(name, member)
    : isCallFromPragma(name);
}
