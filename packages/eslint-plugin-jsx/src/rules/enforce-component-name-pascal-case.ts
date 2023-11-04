import { elementType } from "@eslint-react/jsx";
import { isPascalCase } from "@eslint-react/tools";
import { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "enforce-component-name-pascal-case";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce PascalCase for user-defined JSX components",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      ENFORCE_COMPONENT_NAME_PASCAL_CASE: "Component name must be in PascalCase",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = elementType(node);

        if (/^[a-z]/u.test(name)) {
          return;
        }

        const namesToCheck = name.includes(".")
          ? name.split(".")
          : name.includes(":")
          ? name.split(":")
          : [name];

        for (const nameToCheck of namesToCheck) {
          if (!isPascalCase(nameToCheck)) {
            context.report({
              messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
              node,
            });

            return;
          }
        }
      },
    };
  },
});
