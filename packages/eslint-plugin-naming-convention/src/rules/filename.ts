import { getCaseValidator } from "@eslint-react/shared";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import path from "pathe";

import { createRule, isJSXFile } from "../utils";

export const RULE_NAME = "filename";

export type MessageID = "FILENAME_CASE_MISMATCH" | "FILENAME_CASE_MISMATCH_SUGGESTION" | "FILENAME_EMPTY";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  {
    excepts?: readonly string[];
    rule?: "PascalCase" | "camelCase" | "kebab-case" | "snake_case";
  }?,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    excepts: [],
    // eslint-disable-next-line sonarjs/no-duplicate-string
    rule: "kebab-case",
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

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce naming convention for JSX file names",
      requiresTypeChecking: false,
    },
    schema,
    messages: {
      FILENAME_CASE_MISMATCH: "File name `{{name}}` does not match `{{rule}}`",
      FILENAME_CASE_MISMATCH_SUGGESTION:
        "File name `{{name}}` does not match `{{rule}}`. Should rename to `{{suggestion}}`.",
      FILENAME_EMPTY: "File name is empty",
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

    if (!isJSXFile(fileNameExt)) {
      return {};
    }

    const validator = getCaseValidator(rule, [...excepts]);
    const validate = (n: string) => validator.validate(n);
    const getRecommendedName = (n: string) => validator.getRecommendedName(n);

    return {
      Program(node) {
        const [basename = "", ...rest] = path.basename(context.getFilename()).split(".");

        if (basename.length === 0) {
          return context.report({ messageId: "FILENAME_EMPTY", node });
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
            messageId: "FILENAME_CASE_MISMATCH",
            node,
          }),
          onSome: (value) => ({
            data: {
              name: filename,
              rule,
              suggestion: `${[value, ...rest].join(".")}`,
            },
            messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
            node,
          }),
        });

        context.report(descriptor);
      },
    };
  },
});
