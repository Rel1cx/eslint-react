import { useComponentCollector, useComponentCollectorLegacy } from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { RE_CONSTANT_CASE, RE_PASCAL_CASE, defineRuleListener, toRegExp } from "@eslint-react/shared";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

type Case = "CONSTANT_CASE" | "PascalCase";

type Options = readonly [
  | unit
  | Case
  | {
    allowAllCaps?: boolean;
    excepts?: readonly string[];
    rule?: Case;
  },
];

const defaultOptions = [
  {
    allowAllCaps: false,
    excepts: [],
    rule: "PascalCase",
  },
] as const satisfies Options;

const schema = [
  {
    anyOf: [
      {
        type: "string",
        enum: ["PascalCase", "CONSTANT_CASE"],
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          allowAllCaps: { type: "boolean" },
          excepts: {
            type: "array",
            items: { type: "string", format: "regex" },
          },
          rule: {
            type: "string",
            enum: ["PascalCase", "CONSTANT_CASE"],
          },
        },
      },
    ] satisfies JSONSchema4[],
  },
] satisfies [JSONSchema4];

export const RULE_NAME = "component-name";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "invalidComponentName";

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "Enforces naming conventions for components.",
    },
    messages: {
      invalidComponentName: "A component name '{{name}}' does not match {{rule}}.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const options = normalizeOptions(context.options);
  const { rule } = options;
  const fCollector = useComponentCollector(context);
  const cCollector = useComponentCollectorLegacy(context);

  return defineRuleListener(
    fCollector.visitors,
    cCollector.visitors,
    {
      "Program:exit"(program) {
        for (const { id, name, node: component } of fCollector.ctx.getAllComponents(program)) {
          if (isValidName(name, options)) continue;
          context.report({
            messageId: "invalidComponentName",
            node: id ?? component,
            data: { name, rule },
          });
        }
        for (const { id, name, node } of cCollector.ctx.getAllComponents(program)) {
          if (isValidName(name, options)) continue;
          context.report({
            messageId: "invalidComponentName",
            node: id ?? node,
            data: { name, rule },
          });
        }
      },
    },
  );
}

function normalizeOptions(options: Options) {
  const opts = options[0];
  const defaultOpts = defaultOptions[0];
  if (opts == null) return defaultOpts;
  return {
    ...defaultOpts,
    ...typeof opts === "string"
      ? { rule: opts }
      : {
        ...opts,
        excepts: opts.excepts?.map((s) => toRegExp(s)) ?? [],
      },
  } as const;
}

function isValidName(name: string | unit, options: ReturnType<typeof normalizeOptions>) {
  if (name == null) return true;
  if (options.excepts.some((regex) => regex.test(name))) return true;
  const normalized = name.split(".").at(-1) ?? name;
  switch (options.rule) {
    case "CONSTANT_CASE":
      return RE_CONSTANT_CASE.test(normalized);
    case "PascalCase":
      if (normalized.length > 3 && /^[A-Z]+$/u.test(normalized)) {
        return options.allowAllCaps;
      }
      return RE_PASCAL_CASE.test(normalized);
  }
}
