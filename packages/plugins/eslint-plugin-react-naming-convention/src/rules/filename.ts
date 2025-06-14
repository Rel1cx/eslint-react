import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import path from "node:path";
import { RegExp as RE } from "@eslint-react/kit";
import { camelCase, kebabCase, pascalCase, snakeCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "filename";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "filenameEmpty"
  | "filenameInvalid";

type Case = "camelCase" | "kebab-case" | "PascalCase" | "snake_case";

type Options = readonly [
  | unit
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
      description: "Enforces consistent file naming conventions.",
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
      .map((s) => RE.toRegExp(s))
      .some((pattern) => pattern.test(name));
    if (shouldIgnore) return true;

    return match(casing)
      .with("PascalCase", () => RE.PASCAL_CASE.test(name))
      .with("camelCase", () => RE.CAMEL_CASE.test(name))
      .with("kebab-case", () => RE.KEBAB_CASE.test(name))
      .with("snake_case", () => RE.SNAKE_CASE.test(name))
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
