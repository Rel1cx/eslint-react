import { getClassIdentifier, getFunctionIdentifier } from "@eslint-react/ast";
import { useComponentCollector, useComponentCollectorLegacy } from "@eslint-react/core";
import { getElementName } from "@eslint-react/jsx";
import { RE_CONSTANT_CASE, RE_PASCAL_CASE } from "@eslint-react/shared";
import { isString, O } from "@eslint-react/tools";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "component-name";

export type MessageID = CamelCase<typeof RULE_NAME>;

type Case = "CONSTANT_CASE" | "PascalCase";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | {
    excepts?: readonly string[];
    rule?: Case;
  }
  | Case
  | undefined,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [
  {
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

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce component naming convention to 'PascalCase' or 'CONSTANT_CASE'",
    },
    messages: {
      componentName: "A component name must be in {{case}}.",
    },
    schema,
  },
  name: RULE_NAME,
  create(context) {
    const options = context.options[0] ?? defaultOptions[0];
    const excepts = isString(options) ? [] : options.excepts ?? [];
    const rule = isString(options) ? options : options.rule ?? "PascalCase";

    function validate(name: string, casing: Case = rule, ignores: readonly string[] = excepts) {
      if (ignores.map((pattern) => new RegExp(pattern, "u")).some((pattern) => pattern.test(name))) {
        return true;
      }

      return match(casing)
        .with("CONSTANT_CASE", () => RE_CONSTANT_CASE.test(name))
        .with("PascalCase", () => RE_PASCAL_CASE.test(name))
        .exhaustive();
    }

    const collector = useComponentCollector(context);
    const collectorLegacy = useComponentCollectorLegacy();

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      JSXOpeningElement(node) {
        const name = getElementName(node);
        const shouldIgnore =
          // Ignore built-in element names
          /^[a-z]/u.test(name)
          // Ignore non-Latin character names
          || /\W/u.test(name)
          // Ignore JSX member expression names
          || name.includes(".")
          // Ignore JSX namespace names
          || name.includes(":");
        if (shouldIgnore || validate(name.replace(/^_/u, ""))) return;
        context.report({
          messageId: "componentName",
          node,
          data: {
            case: rule,
          },
        });
      },
      "Program:exit"(node) {
        const functionComponents = collector.ctx.getAllComponents(node);
        const classComponents = collectorLegacy.ctx.getAllComponents(node);
        for (const { node: component } of functionComponents.values()) {
          const maybeId = getFunctionIdentifier(component);
          if (O.isNone(maybeId)) continue;
          const id = maybeId.value;
          const { name } = id;
          if (validate(name)) continue;
          context.report({
            messageId: "componentName",
            node: id,
            data: {
              case: rule,
            },
          });
        }
        for (const { node: component } of classComponents.values()) {
          const maybeId = getClassIdentifier(component);
          if (O.isNone(maybeId)) continue;
          const id = maybeId.value;
          const { name } = id;
          if (validate(name)) continue;
          context.report({
            messageId: "componentName",
            node: id,
            data: {
              case: rule,
            },
          });
        }
      },
    };
  },
  defaultOptions,
});
