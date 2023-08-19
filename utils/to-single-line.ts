export const toSingleLine = (string: string): string =>
    string.replaceAll(/\s{2,}/gu, " ").trim();
