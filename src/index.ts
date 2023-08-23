import { name } from "../package.json";
import jsxBooleanValue from "./rules/jsx-boolean-value";
import jsxHandlerNames from "./rules/jsx-handler-names";

type RuleSeverity = "error" | "off" | "warn";

type RuleDeclaration = [RuleSeverity, { [key: string]: unknown }?];

const recommendedRules: {
    [key: string]: RuleDeclaration;
} = {
    "jsx-boolean-value": ["error"],
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
        "jsx-handler-names": jsxHandlerNames,
    },
};
