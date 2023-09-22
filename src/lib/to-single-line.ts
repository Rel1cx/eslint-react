export function toSingleLine(string: string): string {
    return string.replaceAll(/\s{2,}/gu, " ").trim();
}
