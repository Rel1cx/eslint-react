/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-regexp */
// Copied from https://github.com/epaew/eslint-plugin-filenames-simple/blob/master/src/utils/preset-rules.ts
import { splitName } from "./split-name";

type Rule = {
    expression: RegExp;
    recommendationBuilder?: (name: string) => string;
};
type PresetRules = {
    [key: string]: Required<Rule> | undefined;
    PascalCase: Required<Rule>;
    camelCase: Required<Rule>;
    "kebab-case": Required<Rule>;
    snake_case: Required<Rule>;
};

export const presetRules: PresetRules = {
    PascalCase: {
        expression: /^[A-Z][\dA-Za-z]*$/u,
        recommendationBuilder: (name: string): string => {
            return splitName(name)
                .map((word) => {
                    const [first, ...rest] = word;
                    return `${first?.toUpperCase() ?? ""}${rest.join("")}`;
                })
                .join("");
        },
    },
    camelCase: {
        expression: /^[a-z][\dA-Za-z]*$/u,
        recommendationBuilder: (name: string): string => {
            return splitName(name)
                .map((word, i) => {
                    if (i === 0) {
                        return word;
                    }

                    const [first, ...rest] = word;
                    return `${first?.toUpperCase() ?? ""}${rest.join("")}`;
                })
                .join("");
        },
    },
    "kebab-case": {
        expression: /^[a-z][\d\-a-z]*$/u,
        recommendationBuilder: (name: string): string => {
            return splitName(name).join("-");
        },
    },
    snake_case: {
        expression: /^[a-z][\d_a-z]*$/u,
        recommendationBuilder: (name: string): string => {
            return splitName(name).join("_");
        },
    },
};

export const getRule = (expression: string): Rule => {
    const rule = presetRules[expression];
    return rule ?? { expression: new RegExp(`^${expression}$`, "u") };
};
