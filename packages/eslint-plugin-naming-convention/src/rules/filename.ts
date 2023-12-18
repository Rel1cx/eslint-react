import { ESLintSettingsSchema, getCaseValidator, parse } from "@eslint-react/shared";
import { _, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import path from "pathe";

import { createRule } from "../utils";

export const RULE_NAME = "filename";

export type MessageID =
  | "FILENAME_CASE_MISMATCH"
  | "FILENAME_CASE_MISMATCH_SUGGESTION"
  | "FILENAME_EMPTY";

type Case = "PascalCase" | "camelCase" | "kebab-case" | "snake_case";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | {
    extensions?: readonly string[];
    excepts?: readonly string[];
    rule?: Case;
  }
  | Case
  | undefined,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    extensions: [".jsx", ".tsx"],
    excepts: ["index"],
    rule: "PascalCase",
  },
] as const satisfies Options;

const schema = [
  {
    anyOf: [
      {
        type: "string",
        enum: ["PascalCase", "camelCase", "kebab-case", "snake_case"],
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          extensions: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
          excepts: {
            type: "array",
            items: { type: "string", format: "regex" },
          },
          rule: {
            type: "string",
            enum: ["PascalCase", "camelCase", "kebab-case", "snake_case"],
          },
        },
      },
    ] satisfies JSONSchema4[],
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce naming convention for JSX filenames",
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
    const configs = parse(ESLintSettingsSchema, context.settings).eslintReact;
    const options = context.options[0] ?? defaultOptions[0];
    const rule = _.isString(options) ? options : options.rule ?? "PascalCase";
    const excepts = _.isString(options) ? [] : options.excepts ?? [];
    const extensions = _.isObject(options) && "extensions" in options
      ? options.extensions
      : configs?.jsx?.extensions ?? defaultOptions[0].extensions;

    const filename = context.getFilename();
    const fileNameExt = filename
      .slice(filename.lastIndexOf("."));

    if (!extensions.includes(fileNameExt)) {
      return {};
    }

    const validator = getCaseValidator(rule, [...excepts]);
    const validate = (name: string) => validator.validate(name);
    const getRecommendedName = (name: string) => validator.getRecommendedName(name);

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

        if (O.isNone(maybeSuggestion)) {
          return context.report({
            data: {
              name: filename,
              rule,
            },
            messageId: "FILENAME_CASE_MISMATCH",
            node,
          });
        }

        context.report({
          data: {
            name: filename,
            rule,
            suggestion: [maybeSuggestion.value, ...rest].join("."),
          },
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          node,
        });
      },
    };
  },
});
