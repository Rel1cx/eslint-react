/* eslint-disable sonarjs/no-duplicate-string */
import {
  ESLintSettingsSchema,
  parseSchema,
  RE_CAMEL_CASE,
  RE_KEBAB_CASE,
  RE_PASCAL_CASE,
  RE_SNAKE_CASE,
} from "@eslint-react/shared";
import { _ } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import path from "pathe";
import { camelCase, kebabCase, pascalCase, snakeCase } from "string-ts";
import { match } from "ts-pattern";

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
    const configs = parseSchema(ESLintSettingsSchema, context.settings).eslintReact;
    const options = context.options[0] ?? defaultOptions[0];
    const rule = _.isString(options) ? options : options.rule ?? "PascalCase";
    const excepts = _.isString(options) ? [] : options.excepts ?? [];
    const extensions = _.isObject(options) && "extensions" in options
      ? options.extensions
      : configs?.jsx?.extensions ?? defaultOptions[0].extensions;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const filename = context.filename ?? context.getFilename();
    const fileNameExt = filename
      .slice(filename.lastIndexOf("."));

    if (!extensions.includes(fileNameExt)) {
      return {};
    }

    function validate(name: string, casing: Case = rule, ignores: readonly string[] = excepts) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      if (ignores.map((pattern) => new RegExp(`^${pattern}$`, "u")).some((pattern) => pattern.test(name))) {
        return true;
      }

      return match(casing)
        .with("PascalCase", () => RE_PASCAL_CASE.test(name))
        .with("camelCase", () => RE_CAMEL_CASE.test(name))
        .with("kebab-case", () => RE_KEBAB_CASE.test(name))
        .with("snake_case", () => RE_SNAKE_CASE.test(name))
        .exhaustive();
    }

    function getSuggestion(name: string, casing: Case = rule) {
      return match(casing)
        .with("PascalCase", () => pascalCase(name))
        .with("camelCase", () => camelCase(name))
        .with("kebab-case", () => kebabCase(name))
        .with("snake_case", () => snakeCase(name))
        .exhaustive();
    }

    return {
      Program(node) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const [basename = "", ...rest] = path.basename(context.filename ?? context.getFilename()).split(".");

        if (basename.length === 0) {
          return context.report({ messageId: "FILENAME_EMPTY", node });
        }

        if (validate(basename)) {
          return;
        }

        context.report({
          data: {
            name: filename,
            rule,
            suggestion: [getSuggestion(basename), ...rest].join("."),
          },
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          node,
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID, Options>;
