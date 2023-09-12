import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import path from "pathe";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { getCaseValidator } from "../lib/case-validator/case-validator";
import { O } from "../lib/primitives/data";
import { Enum } from "../lib/primitives/enum";

const RULE_NAME: RuleName = "enforce-filename-naming-convention";

const MessageID = Enum("FILENAME_EMPTY", "FILENAME_CASE_MISMATCH", "FILENAME_CASE_MISMATCH_SUGGESTION");

type MessageID = Enum<typeof MessageID>;

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

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce naming convention for jsx files",
            recommended: "recommended",
        },
        schema,
        messages: {
            [MessageID.FILENAME_CASE_MISMATCH]: "File name `{{name}}` does not match `{{rule}}`",
            [MessageID.FILENAME_CASE_MISMATCH_SUGGESTION]:
                "File name `{{name}}` does not match `{{rule}}`. Should rename to `{{suggestion}}`.",
            [MessageID.FILENAME_EMPTY]: "File name is empty",
        },
    },
    defaultOptions,
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
                    context.report({ messageId: MessageID.FILENAME_EMPTY, node });
                }

                if (validate(basename)) {
                    return;
                }

                const maybeSuggestion = O.liftThrowable(getRecommendedName)(basename);

                const descriptor: ReportDescriptor<MessageID> = O.match(maybeSuggestion, {
                    onNone: () => ({
                        data: {
                            name: basename,
                            rule,
                        },
                        messageId: MessageID.FILENAME_CASE_MISMATCH,
                        node,
                    }),
                    onSome: (value) => ({
                        data: {
                            name: filename,
                            rule,
                            suggestion: `${[value, ...rest].join(".")}`,
                        },
                        messageId: MessageID.FILENAME_CASE_MISMATCH_SUGGESTION,
                        node,
                    }),
                });

                context.report(descriptor);
            },
        };
    },
});
