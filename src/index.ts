import { name } from "../package.json";
import type { Severity } from "../typings";
import debugFunctionComponent from "./rules/debug-function-component";
import enforceEventHandlerNamingConvention from "./rules/enforce-event-handler-naming-convention";
import enforceFilenameNamingConvention from "./rules/enforce-filename-naming-convention";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noDangerWithChildren from "./rules/no-danger-with-children";
import noDeprecatedStringRefs from "./rules/no-deprecated-string-refs";
import noMisusedCommentInTextNode from "./rules/no-misused-comment-in-textnode";
import noMisusedJsxExtension from "./rules/no-misused-jsx-extension";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";
import preferShorthandJsxBoolean from "./rules/prefer-shorthand-jsx-boolean";

export type RuleDeclaration = [Severity, Record<string, unknown>?] | Severity;

export type RulePreset = Record<string, RuleDeclaration>;

const allRules = {
    "enforce-event-handler-naming-convention": "error",
    "enforce-filename-naming-convention": "error",
    "no-constructed-context-value": "error",
    "no-danger-with-children": "error",
    "no-deprecated-string-refs": "error",
    "no-misused-comment-in-textnode": "error",
    "no-misused-jsx-extension": "warn",
    "no-unstable-default-props": "error",
    "prefer-shorthand-jsx-boolean": "error",
} as const satisfies RulePreset;

const recommendedRules = {
    "enforce-event-handler-naming-convention": "error",
    "no-constructed-context-value": "error",
    "no-danger-with-children": "error",
    "no-deprecated-string-refs": "error",
    "no-misused-comment-in-textnode": "error",
    "no-unstable-default-props": "error",
    "prefer-shorthand-jsx-boolean": "error",
} as const satisfies RulePreset;

const debugRules = {
    "debug-function-component": "warn",
} as const satisfies RulePreset;

const createConfig = (rules: RulePreset) => {
    return {
        plugins: ["react-ts"],
        rules: Object.fromEntries(Object.entries(rules).map(([key, value]) => [`react-ts/${key}`, value])),
    };
};

export default {
    name,
    configs: {
        all: createConfig(allRules),
        debug: createConfig(debugRules),
        recommended: createConfig(recommendedRules),
        "recommended-type-checked": createConfig(recommendedRules),
    },
    rules: {
        "debug-function-component": debugFunctionComponent,
        "enforce-event-handler-naming-convention": enforceEventHandlerNamingConvention,
        "enforce-filename-naming-convention": enforceFilenameNamingConvention,
        "no-constructed-context-value": noConstructedContextValue,
        "no-danger-with-children": noDangerWithChildren,
        "no-deprecated-string-refs": noDeprecatedStringRefs,
        "no-misused-comment-in-textnode": noMisusedCommentInTextNode,
        "no-misused-jsx-extension": noMisusedJsxExtension,
        "no-unstable-default-props": noUnstableDefaultProps,
        "prefer-shorthand-jsx-boolean": preferShorthandJsxBoolean,
    },
};
