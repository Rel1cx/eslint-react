import path from "node:path";

import { RE_CAMEL_CASE, RE_KEBAB_CASE, RE_PASCAL_CASE, RE_SNAKE_CASE } from "@eslint-react/shared";
import { isObject, isString } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { camelCase, kebabCase, pascalCase, snakeCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "filename";

export type MessageID =
  | "filenameCaseMismatch"
  | "filenameCaseMismatchSuggestion"
  | "filenameEmpty";

type Case = "PascalCase" | "camelCase" | "kebab-case" | "snake_case";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | {
    /**
     * @deprecated Use ESLint's [files](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) feature instead.
     */
    excepts?: readonly string[];
    /**
     * @deprecated Use ESLint's [files](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) feature instead.
     */
    extensions?: readonly string[];
    rule?: Case;
  }
  | Case
  | undefined,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    excepts: ["^index$"],
    extensions: [".jsx", ".tsx"],
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
          excepts: {
            type: "array",
            items: { type: "string", format: "regex" },
          },
          extensions: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
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
  meta: {
    type: "problem",
    docs: {
      description: "enforce naming convention for JSX filenames",
    },
    messages: {
      filenameCaseMismatch: "A file with name '{{name}}' does not match {{rule}}.",
      filenameCaseMismatchSuggestion:
        "A file with name '{{name}}' does not match {{rule}}. Should rename to '{{suggestion}}'.",
      filenameEmpty: "A file must have non-empty name.",
    },
    schema,
  },
  name: RULE_NAME,
  create(context) {
    const options = context.options[0] ?? defaultOptions[0];
    const rule = isString(options) ? options : options.rule ?? "PascalCase";
    const excepts = isString(options) ? [] : options.excepts ?? [];
    const extensions = isObject(options) && "extensions" in options
      ? options.extensions
      : defaultOptions[0].extensions;

    const filename = context.filename;
    const fileNameExt = filename
      .slice(filename.lastIndexOf("."));
    if (!extensions.includes(fileNameExt)) return {};

    function validate(name: string, casing: Case = rule, ignores: readonly string[] = excepts) {
      if (ignores.map((pattern) => new RegExp(pattern, "u")).some((pattern) => pattern.test(name))) {
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
        const [basename = "", ...rest] = path.basename(context.filename).split(".");
        if (basename.length === 0) {
          context.report({ messageId: "filenameEmpty", node });
          return;
        }
        if (validate(basename)) return;
        context.report({
          messageId: "filenameCaseMismatchSuggestion",
          node,
          data: {
            name: filename,
            rule,
            suggestion: [getSuggestion(basename), ...rest].join("."),
          },
        });
      },
    };
  },
  defaultOptions,
}) satisfies ESLintUtils.RuleModule<MessageID, Options>;
