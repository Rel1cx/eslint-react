import type { RulePreset } from "@eslint-react/shared";

import { name } from "../package.json";
import debugFunctionComponent from "./rules/debug/function-component";
import jsxNoLeakedConditionalRendering from "./rules/jsx/no-leaked-conditional-rendering";
import jsxNoMisusedCommentInTextNode from "./rules/jsx/no-misused-comment-in-textnode";
import jsxPreferShorthandJsxBoolean from "./rules/jsx/prefer-shorthand-boolean";
import namingConventionEventHandler from "./rules/naming-convention/event-handler";
import namingConventionFilename from "./rules/naming-convention/filename";
import namingConventionFilenameExtension from "./rules/naming-convention/filename-extension";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noDeprecatedStringRefs from "./rules/no-deprecated-string-refs";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";

const rules = {
    "debug/function-component": "warn",
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/prefer-shorthand-boolean": "warn",
    "naming-convention/event-handler": "warn",
    "naming-convention/filename": "warn",
    "naming-convention/filename-extension": "warn",
    "no-constructed-context-value": "error",
    "no-dangerously-set-innerhtml": "error",
    "no-dangerously-set-innerhtml-with-children": "error",
    "no-deprecated-string-refs": "error",
    "no-unstable-default-props": "error",
} as const satisfies RulePreset;

const rulesEntries = Object.entries(rules);

const recommendedRules = {
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/prefer-shorthand-boolean": "warn",
    "no-constructed-context-value": "error",
    "no-dangerously-set-innerhtml": "error",
    "no-dangerously-set-innerhtml-with-children": "error",
    "no-deprecated-string-refs": "error",
    "no-unstable-default-props": "error",
} as const satisfies RulePreset;

const allRules = Object.fromEntries(rulesEntries.filter(([key]) => !key.startsWith("debug/"))) satisfies RulePreset;

// dprint-ignore
const jsxRules = Object.fromEntries(rulesEntries.filter(([key]) => key.startsWith("jsx/"))) satisfies RulePreset;

const offRules = Object.fromEntries(rulesEntries.map(([key]) => [key, "off"])) satisfies RulePreset;

const debugRules = Object.fromEntries(rulesEntries.filter(([key]) => key.startsWith("debug/"))) satisfies RulePreset;

const createConfig = (rules: RulePreset) => {
    return {
        plugins: ["react-ts"],
        rules: Object.fromEntries(Object.entries(rules).map(([key, value]) => [`@eslint-react/${key}`, value])),
    };
};

export default {
    name,
    configs: {
        all: createConfig(allRules),
        debug: createConfig(debugRules),
        jsx: createConfig(jsxRules),
        off: createConfig(offRules),
        recommended: createConfig(recommendedRules),
        "recommended-type-checked": createConfig(recommendedRules),
    },
    rules: {
        "debug/function-component": debugFunctionComponent,
        "jsx/no-leaked-conditional-rendering": jsxNoLeakedConditionalRendering,
        "jsx/no-misused-comment-in-textnode": jsxNoMisusedCommentInTextNode,
        "jsx/prefer-shorthand-boolean": jsxPreferShorthandJsxBoolean,
        "naming-convention/event-handler": namingConventionEventHandler,
        "naming-convention/filename": namingConventionFilename,
        "naming-convention/filename-extension": namingConventionFilenameExtension,
        "no-constructed-context-value": noConstructedContextValue,
        "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
        "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
        "no-deprecated-string-refs": noDeprecatedStringRefs,
        "no-unstable-default-props": noUnstableDefaultProps,
    },
} as const;
