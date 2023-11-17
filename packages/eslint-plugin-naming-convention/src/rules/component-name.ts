import { getClassIdentifier, getFunctionIdentifier } from "@eslint-react/ast";
import { componentCollector, componentCollectorLegacy } from "@eslint-react/core";
import { elementType } from "@eslint-react/jsx";
import { getCaseValidator } from "@eslint-react/shared";
import { E } from "@eslint-react/tools";
import { type ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "component-name";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type Options = readonly [
  {
    excepts?: readonly string[];
    rule?: "CONSTANT_CASE" | "PascalCase";
  }?,
];

const defaultOptions = [
  {
    excepts: [],
    rule: "PascalCase",
  },
] as const satisfies Options;

const schema = [
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
        default: "PascalCase",
        enum: ["PascalCase", "CONSTANT_CASE"],
      },
    },
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce component naming convention to `PascalCase` or `CONSTANT_CASE`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema,
    messages: {
      COMPONENT_NAME: "Component name must be in {{case}}.",
    },
  },
  defaultOptions,
  create(context) {
    const [option] = context.options;
    const [defaultOption] = defaultOptions;
    const rule = option?.rule ?? defaultOption.rule;
    const excepts = option?.excepts ?? defaultOption.excepts;

    const collector = componentCollector(context);
    const collectorLegacy = componentCollectorLegacy(context);

    const validator = getCaseValidator(rule, [...excepts]);
    const validate = (n: string) => validator.validate(n);

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      JSXOpeningElement(node) {
        const name = elementType(node);

        if (
          // Ignore built-in element names
          /^[a-z]/u.test(name)
          // Ignore non-Latin character names
          || /\W/u.test(name)
          // Ignore JSX member expression names
          || name.includes(".")
          // Ignore JSX namespace names
          || name.includes(":")
        ) {
          return;
        }

        if (validate(name.replace(/^_/u, ""))) {
          return;
        }

        context.report({
          data: {
            case: rule,
          },
          messageId: "COMPONENT_NAME",
          node,
        });
      },
      "Program:exit"() {
        const maybeFunctionComponents = collector.ctx.getAllComponents();
        if (E.isLeft(maybeFunctionComponents)) {
          console.error(maybeFunctionComponents.left);

          return;
        }
        const functionComponents = maybeFunctionComponents.right;
        const maybeClassComponents = collectorLegacy.ctx.getAllComponents();
        if (E.isLeft(maybeClassComponents)) {
          console.error(maybeClassComponents.left);

          return;
        }
        const classComponents = maybeClassComponents.right;

        for (const { node: component } of functionComponents) {
          const id = getFunctionIdentifier(component);

          if (!id) {
            continue;
          }

          const { name } = id;

          if (validate(name)) {
            continue;
          }

          context.report({
            data: {
              case: rule,
            },
            messageId: "COMPONENT_NAME",
            node: id,
          });
        }
        for (const { node: component } of classComponents) {
          const id = getClassIdentifier(component);

          if (!id) {
            continue;
          }

          const { name } = id;

          if (validate(name)) {
            continue;
          }

          context.report({
            data: {
              case: rule,
            },
            messageId: "COMPONENT_NAME",
            node: id,
          });
        }
      },
    };
  },
});
