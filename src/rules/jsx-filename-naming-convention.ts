import path from "node:path";

import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { getCaseValidator } from "../lib/case-validator/case-validator";
import { O } from "../lib/primitives/data";

type MessageIds = "filenameCaseMismatch" | "filenameCaseMismatchWithSuggestion" | "filenameEmpty";

type Options = [
    {
        rule?: "PascalCase" | "camelCase" | "kebab-case" | "snake_case";
        // excepts?: string[];
    }?,
];

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            // TODO: implement excepts
            // excepts: {
            //     type: "array",
            //     default: ["index"],
            //     items: { type: "string", format: "regex" },
            // },
            rule: {
                type: "string",
                default: "kebab-case",
                enum: ["camelCase", "kebab-case", "PascalCase", "snake_case"],
            },
        },
    },
] satisfies [JSONSchema4];

const defaultOptions = [
    {
        rule: "PascalCase",
        // excepts: [],
    },
] satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: "jsx-filename-naming-convention",
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce naming convention for jsx files",
            recommended: "recommended",
        },
        schema,
        messages: {
            filenameCaseMismatch: "File name `{{name}}` does not match `{{rule}}`",
            filenameCaseMismatchWithSuggestion:
                "File name `{{name}}` does not match `{{rule}}`. Should rename to `{{suggestion}}`.",
            filenameEmpty: "File name is empty",
        },
    },
    create(context) {
        const [option] = context.options;
        const [defaultOption] = defaultOptions;
        const rule = option?.rule ?? defaultOption.rule;
        const filename = context.getFilename();
        const fileNameExt = filename.slice(filename.lastIndexOf("."));

        if (fileNameExt !== ".tsx") {
            return {};
        }

        const validator = getCaseValidator(rule);
        const validate = (n: string) => validator.validate(n);
        const getRecommendedName = (n: string) => validator.getRecommendedName(n);

        return {
            Program(node) {
                const [basename = "", ...rest] = path.basename(context.getFilename()).split(".");

                if (basename.length === 0) {
                    context.report({ messageId: "filenameEmpty", node });
                }

                if (validate(basename)) {
                    return;
                }

                const maybeSuggestion = O.liftThrowable(getRecommendedName)(basename);

                if (O.isNone(maybeSuggestion)) {
                    return context.report({
                        data: {
                            name: basename,
                            rule,
                        },
                        messageId: "filenameCaseMismatch",
                        node,
                    });
                }

                const suggestion = `${[maybeSuggestion.value, ...rest].join(".")}`;

                return context.report({
                    data: {
                        name: filename,
                        rule,
                        suggestion,
                    },
                    messageId: "filenameCaseMismatchWithSuggestion",
                    node,
                });
            },
        };
    },
    defaultOptions,
});
