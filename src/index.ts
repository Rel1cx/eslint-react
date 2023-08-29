import { name } from "../package.json";
import enforceEventHandlerNamingConvention from "./rules/enforce-event-handler-naming-convention";
import enforceFilenameNamingConvention from "./rules/enforce-filename-naming-convention";
import noMisusedJsxExtension from "./rules/no-misused-jsx-extension";
import preferShorthandJsxBoolean from "./rules/prefer-shorthand-jsx-boolean";

type RuleSeverity = "error" | "off" | "warn";

type RuleDeclaration = [RuleSeverity, Record<string, unknown>?] | RuleSeverity;

const recommendedRules: Record<string, RuleDeclaration> = {
    "enforce-event-handler-naming-convention": "warn",
    "enforce-filename-naming-convention": "warn",
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
        "enforce-event-handler-naming-convention": enforceEventHandlerNamingConvention,
        "enforce-filename-naming-convention": enforceFilenameNamingConvention,
        "no-misused-jsx-extension": noMisusedJsxExtension,
        "prefer-shorthand-jsx-boolean": preferShorthandJsxBoolean,
    },
};
