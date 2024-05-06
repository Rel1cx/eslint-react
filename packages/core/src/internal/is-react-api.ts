import { isCallFromReact, isCallFromReactMember, isFromReact, isFromReactMember } from "./is-from-react";

export function isReactAPIWithName(name: string): ReturnType<typeof isFromReact>;
export function isReactAPIWithName(name: string, member: string): ReturnType<typeof isFromReactMember>;
export function isReactAPIWithName(name: string, member?: string) {
  return member
    ? isFromReactMember(name, member)
    : isFromReact(name);
}

export function isReactAPICallWithName(name: string): ReturnType<typeof isCallFromReact>;
export function isReactAPICallWithName(name: string, member: string): ReturnType<typeof isCallFromReactMember>;
export function isReactAPICallWithName(name: string, member?: string) {
  return member
    ? isCallFromReactMember(name, member)
    : isCallFromReact(name);
}
