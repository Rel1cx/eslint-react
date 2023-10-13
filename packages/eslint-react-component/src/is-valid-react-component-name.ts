export const RE_COMPONENT_NAME = /^[A-Z]/u;

export function isValidReactComponentName(name: null | string | undefined): name is string {
    return !!name && RE_COMPONENT_NAME.test(name);
}
