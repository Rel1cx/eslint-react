import * as AST from "@eslint-react/ast";
import { useComponentCollector, useComponentCollectorLegacy } from "@eslint-react/core";
import type { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { RE_CONSTANT_CASE, RE_PASCAL_CASE } from "@eslint-react/shared";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule } from "../utils";

export const RULE_NAME = "component-name";

export const RULE_FEATURES = [
  "CHK",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "invalid";

type Case = "CONSTANT_CASE" | "PascalCase";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | Case
  | undefined
  | {
    allowAllCaps?: boolean;
    allowLeadingUnderscore?: boolean;
    allowNamespace?: boolean;
    excepts?: readonly string[];
    rule?: Case;
  },
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
    allowAllCaps: false,
    allowLeadingUnderscore: false,
    allowNamespace: false,
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
          allowLeadingUnderscore: { type: "boolean" },
          allowNamespace: { type: "boolean" },
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
        excepts: opts.excepts?.map((pattern) => new RegExp(pattern, "u")) ?? [],
      },
  } as const;
}

function isValidComponentName(name: string | _, options: ReturnType<typeof normalizeOptions>) {
  if (name == null) return true;
  if (options.excepts.some((regex) => regex.test(name))) return true;
  let normalized = name.split(".").at(-1) ?? name;
  if (options.allowNamespace) normalized = normalized.replace(":", "");
  if (options.allowLeadingUnderscore) normalized = normalized.replace(/^_/, "");
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

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "enforce naming convention for components",
    },
    messages: {
      invalid: "A component name '{{name}}' does not match {{rule}}.",
    },
    schema,
  },
  name: RULE_NAME,
  create(context) {
    const options = normalizeOptions(context.options);
    const { rule } = options;
    const collector = useComponentCollector(context);
    const collectorLegacy = useComponentCollectorLegacy();

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      JSXOpeningElement(node) {
        const name = JSX.getElementName(node.parent);
        if (/^[a-z]/u.test(name)) {
          return;
        }
        if (isValidComponentName(name, options)) return;
        context.report({
          messageId: "invalid",
          node,
          data: { name, rule },
        });
      },
      "Program:exit"(node) {
        const functionComponents = collector.ctx.getAllComponents(node);
        const classComponents = collectorLegacy.ctx.getAllComponents(node);
        for (const { node: component } of functionComponents.values()) {
          const id = AST.getFunctionIdentifier(component);
          if (id?.name == null) continue;
          const name = id.name;
          if (isValidComponentName(name, options)) return;
          context.report({
            messageId: "invalid",
            node: id,
            data: { name, rule },
          });
        }
        for (const { node: component } of classComponents.values()) {
          const id = AST.getClassIdentifier(component);
          if (id?.name == null) continue;
          const name = id.name;
          if (isValidComponentName(name, options)) continue;
          context.report({
            messageId: "invalid",
            node: id,
            data: { name, rule },
          });
        }
      },
    };
  },
  defaultOptions,
});
