export function isWhiteSpace(value: string) {
    // return /^\s*$/u.test(value);
    return value.trim() === "";
}
