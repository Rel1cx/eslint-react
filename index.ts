import { name } from "./package.json";
import jsxBooleanValue, {
    RULE_NAME as jsxBooleanValueName,
} from "./rules/jsx-boolean-value";

type RuleSeverity = "error" | "warn" | "off";

type RuleDeclaration = [RuleSeverity, { [key: string]: unknown }?];

const recommendedRules: {
    [key: string]: RuleDeclaration;
} = {
    [jsxBooleanValueName]: ["error"],
};

const createConfig = (rules = recommendedRules) => {
    return {
        plugins: ["react-ts"],
        rules: Object.fromEntries(
            Object.entries(rules).map(([key, value]) => [
                `react-ts/${key}`,
                value,
            ]),
        ),
    };
};

export default {
    name,
    configs: {
        all: createConfig(),
        recommended: createConfig(),
        "recommended-requiring-type-checking": createConfig(),
    },
    rules: {
        [jsxBooleanValueName]: jsxBooleanValue,
    },
};
