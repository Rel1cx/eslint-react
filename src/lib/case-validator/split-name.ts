/*
 * Copied from https://github.com/epaew/eslint-plugin-filenames-simple/blob/master/src/utils/split-name.ts
 * Split the file/variable name written in camelCase, kebab-case, PascalCase, and snake_case.
 */
export const splitName = (name: string): string[] => {
    return name
        .replaceAll("_", "-")
        .replaceAll(/([\da-z])([A-Z])|([A-Z])([A-Z])(?=[a-z])/gu, "$1$3-$2$4")
        .toLowerCase()
        .split("-");
};
