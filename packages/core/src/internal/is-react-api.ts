import { isCallFromPragma, isCallFromPragmaMember, isFromPragma, isFromPragmaMember } from "@eslint-react/jsx";

export function isReactAPIWithName(name: string): ReturnType<typeof isFromPragma>;
export function isReactAPIWithName(name: string, member: string): ReturnType<typeof isFromPragmaMember>;
export function isReactAPIWithName(name: string, member?: string) {
  return member
    ? isFromPragmaMember(name, member)
    : isFromPragma(name);
}

export function isReactAPICallWithName(name: string): ReturnType<typeof isCallFromPragma>;
export function isReactAPICallWithName(name: string, member: string): ReturnType<typeof isCallFromPragmaMember>;
export function isReactAPICallWithName(name: string, member?: string) {
  return member
    ? isCallFromPragmaMember(name, member)
    : isCallFromPragma(name);
}
