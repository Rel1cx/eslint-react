export function isComponentName(name: string) {
    // eslint-disable-next-line require-unicode-regexp
    return /^[A-Z]/.test(name);
}
