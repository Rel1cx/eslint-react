import path from "node:path";

import type { _ } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { RE_CAMEL_CASE, RE_KEBAB_CASE, RE_PASCAL_CASE, RE_SNAKE_CASE } from "@eslint-react/shared";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { camelCase, kebabCase, pascalCase, snakeCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule, toRegExp } from "../utils";

export const RULE_NAME = "filename";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "filenameEmpty"
  | "filenameInvalid";

type Case = "camelCase" | "kebab-case" | "PascalCase" | "snake_case";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | _
  | Case
  | {
    /**
     * @deprecated Use ESLint's [files](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) feature instead
     */
    excepts?: readonly string[];
    /**
     * @deprecated Use ESLint's [files](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) feature instead
     */
    extensions?: readonly string[];
    rule?: Case;
  },
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    excepts: ["^index$"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
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
    defaultOptions: [...defaultOptions],
    docs: {
      description: "enforce naming convention for JSX filenames",
    },
    messages: {
      filenameEmpty: "A file must have non-empty name.",
      filenameInvalid: "A file with name '{{name}}' does not match {{rule}}. Rename it to '{{suggestion}}'.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const options = context.options[0] ?? defaultOptions[0];
  const rule = typeof options === "string"
    ? options
    : options.rule ?? "PascalCase";
  const excepts = typeof options === "string"
    ? []
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    : options.excepts ?? [];

  function validate(name: string, casing: Case = rule, ignores: readonly string[] = excepts) {
    const shouldIgnore = ignores
      .map(toRegExp)
      .some((pattern) => pattern.test(name));
    if (shouldIgnore) return true;

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
      if (validate(basename)) {
        return;
      }
      context.report({
        messageId: "filenameInvalid",
        node,
        data: {
          name: context.filename,
          rule,
          suggestion: [getSuggestion(basename), ...rest].join("."),
        },
      });
    },
  };
}
