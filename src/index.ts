import { name } from "../package.json";
import consistentJsxFilenames from "./rules/consistent-jsx-filenames";
import consistentJsxHandlerNames from "./rules/consistent-jsx-handler-names";
import noMisusedJsxExtension from "./rules/no-misused-jsx-extension";
import preferShorthandJsxBoolean from "./rules/prefer-shorthand-jsx-boolean";

type RuleSeverity = "error" | "off" | "warn";

type RuleDeclaration = [RuleSeverity, { [key: string]: unknown }?] | RuleSeverity;

const recommendedRules: {
    [key: string]: RuleDeclaration;
} = {
    "consistent-jsx-filenames": "error",
    "consistent-jsx-handler-names": "error",
    "no-misused-jsx-extension": "warn",
    "prefer-shorthand-jsx-boolean": "warn",
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
        "consistent-jsx-filenames": consistentJsxFilenames,
        "consistent-jsx-handler-names": consistentJsxHandlerNames,
        "no-misused-jsx-extension": noMisusedJsxExtension,
        "prefer-shorthand-jsx-boolean": preferShorthandJsxBoolean,
    },
};
