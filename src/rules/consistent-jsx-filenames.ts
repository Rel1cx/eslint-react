import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import path from "pathe";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { getCaseValidator } from "../lib/case-validator/case-validator";
import { O } from "../lib/primitives/data";

const RULE_NAME: RuleName = "consistent-jsx-filenames";

type MessageIds = "FILENAME_CASE_MISMATCH" | "FILENAME_CASE_MISMATCH_SUGGESTION" | "FILENAME_EMPTY";

type Options = readonly [
    {
        excepts?: readonly string[];
        rule?: "PascalCase" | "camelCase" | "kebab-case" | "snake_case";
    }?,
];

const defaultOptions = [
    {
        excepts: [],
        rule: "PascalCase",
    },
] as const satisfies Options;

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            excepts: {
                type: "array",
                default: ["index"],
                items: { type: "string", format: "regex" },
            },
            rule: {
                type: "string",
                default: "kebab-case",
                enum: ["camelCase", "kebab-case", "PascalCase", "snake_case"],
            },
        },
    },
] satisfies [JSONSchema4];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce naming convention for jsx files",
            recommended: "recommended",
        },
        schema,
        messages: {
            FILENAME_CASE_MISMATCH: "File name `{{name}}` does not match `{{rule}}`",
            FILENAME_CASE_MISMATCH_SUGGESTION:
                "File name `{{name}}` does not match `{{rule}}`. Should rename to `{{suggestion}}`.",
            FILENAME_EMPTY: "File name is empty",
        },
    },
    create(context) {
        const [option] = context.options;
        const [defaultOption] = defaultOptions;
        const rule = option?.rule ?? defaultOption.rule;
        const excepts = option?.excepts ?? defaultOption.excepts;

        const filename = context.getFilename();
        const fileNameExt = filename.slice(filename.lastIndexOf("."));

        if (fileNameExt !== ".tsx") {
            return {};
        }

        const validator = getCaseValidator(rule, [...excepts]);
        const validate = (n: string) => validator.validate(n);
        const getRecommendedName = (n: string) => validator.getRecommendedName(n);

        return {
            Program(node) {
                const [basename = "", ...rest] = path.basename(context.getFilename()).split(".");

                if (basename.length === 0) {
                    context.report({ messageId: "FILENAME_EMPTY", node });
                }

                if (validate(basename)) {
                    return;
                }

                const maybeSuggestion = O.liftThrowable(getRecommendedName)(basename);

                match(maybeSuggestion)
                    .when(O.isSome, ({ value }) => {
                        const suggestion = `${[value, ...rest].join(".")}`;
                        return context.report({
                            data: {
                                name: filename,
                                rule,
                                suggestion,
                            },
                            messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
                            node,
                        });
                    })
                    .otherwise(() => {
                        return context.report({
                            data: {
                                name: basename,
                                rule,
                            },
                            messageId: "FILENAME_CASE_MISMATCH",
                            node,
                        });
                    });
            },
        };
    },
    defaultOptions,
});
