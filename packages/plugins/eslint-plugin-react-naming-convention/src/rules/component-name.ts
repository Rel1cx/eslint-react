import { getClassIdentifier, getFunctionIdentifier } from "@eslint-react/ast";
import { useComponentCollector, useComponentCollectorLegacy } from "@eslint-react/core";
import { getElementName } from "@eslint-react/jsx";
import { RE_CONSTANT_CASE, RE_PASCAL_CASE } from "@eslint-react/shared";
import { F, isNullable, isString, O } from "@eslint-react/tools";
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
    allowAllCaps?: boolean;
    allowLeadingUnderscore?: boolean;
    allowNamespace?: boolean;
    excepts?: readonly string[];
    rule?: Case;
  }
  | Case
  | undefined,
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
  const [opts] = options;
  if (isNullable(opts)) return defaultOptions[0];
  if (isString(opts)) return { ...defaultOptions[0], rule: opts } as const;
  return {
    ...opts,
    excepts: opts.excepts?.map(pattern => new RegExp(pattern, "u")) ?? [],
  } as const;
}

function validate(name: string, options: ReturnType<typeof normalizeOptions>) {
  if (options.excepts.some((regex) => regex.test(name))) {
    return true;
  }
  let normalized = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "");
  normalized = normalized.split(".").at(-1) ?? normalized;
  if (options.allowNamespace) {
    normalized = normalized.replace(":", "");
  }
  if (options.allowLeadingUnderscore) {
    normalized = normalized.replace(/^_/, "");
  }
  return match(options.rule)
    .with("CONSTANT_CASE", () => RE_CONSTANT_CASE.test(normalized))
    .with("PascalCase", () => {
      // Allow all caps if the string is shorter than 4 characters. e.g. UI, CSS, SVG, etc.
      if ([...normalized].length > 3 && /^[A-Z]+$/u.test(normalized)) return options.allowAllCaps;
      return RE_PASCAL_CASE.test(normalized);
    })
    .otherwise(F.constFalse);
}

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
    const options = normalizeOptions(context.options);

    const collector = useComponentCollector(context);
    const collectorLegacy = useComponentCollectorLegacy();

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      JSXOpeningElement(node) {
        const name = getElementName(node);
        if (/^[a-z]/u.test(name)) return;
        if (validate(name, options)) return;
        context.report({
          messageId: "componentName",
          node,
          data: {
            case: options.rule,
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
          if (validate(name, options)) continue;
          context.report({
            messageId: "componentName",
            node: id,
            data: {
              case: options.rule,
            },
          });
        }
        for (const { node: component } of classComponents.values()) {
          const maybeId = getClassIdentifier(component);
          if (O.isNone(maybeId)) continue;
          const id = maybeId.value;
          const { name } = id;
          if (validate(name, options)) continue;
          context.report({
            messageId: "componentName",
            node: id,
            data: {
              case: options.rule,
            },
          });
        }
      },
    };
  },
  defaultOptions,
});
