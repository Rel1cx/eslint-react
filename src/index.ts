import { name } from "../package.json";
import jsxBooleanValue from "./rules/jsx-boolean-value";
import jsxFilenameNamingConvention from "./rules/jsx-filename-naming-convention";
import jsxFilenameNoMisuseJsx from "./rules/jsx-filename-no-misuse-jsx";
import jsxHandlerNames from "./rules/jsx-handler-names";

type RuleSeverity = "error" | "off" | "warn";

type RuleDeclaration = [RuleSeverity, { [key: string]: unknown }?];

const recommendedRules: {
    [key: string]: RuleDeclaration;
} = {
    "jsx-boolean-value": ["error"],
    "jsx-filename-naming-convention": ["error"],
    "jsx-filename-no-misuse-jsx": ["error"],
    "jsx-handler-names": ["error"],
};

const createConfig = (rules = recommendedRules) => {
    return {
        plugins: ["react-ts"],
        rules: Object.fromEntries(Object.entries(rules).map(([key, value]) => [`react-ts/${key}`, value])),
    };
};

export default {
    name,
    configs: {
        all: createConfig(),
        recommended: createConfig(),
        "recommended-type-checked": createConfig(),
    },
    rules: {
        "jsx-boolean-value": jsxBooleanValue,
        "jsx-filename-naming-convention": jsxFilenameNamingConvention,
        "jsx-filename-no-misuse-jsx": jsxFilenameNoMisuseJsx,
        "jsx-handler-names": jsxHandlerNames,
    },
};
