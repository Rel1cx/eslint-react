export const RE_COMPONENT_NAME = /^[A-Z]/u;
export const RE_HOOK_NAME = /^use[A-Z\d].*$/u;

export function isValidReactComponentName(name: null | string | undefined): name is string {
    return !!name && RE_COMPONENT_NAME.test(name);
}

export function isValidReactHookName(name: null | string | undefined): name is string {
    return !!name && RE_HOOK_NAME.test(name);
}
