export const RE_HOOK_NAME = /^use[A-Z\d]/u;

export function isValidReactHookName(name: string) {
  return name === "use" || RE_HOOK_NAME.test(name);
}
