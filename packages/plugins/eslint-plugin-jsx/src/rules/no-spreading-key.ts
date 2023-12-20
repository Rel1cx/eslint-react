import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-spreading-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow spreading `key` from objects.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_SPREADING_KEY: "Do not spread `key` from objects.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const maybeKeyAttribute = findPropInAttributes(node.attributes, context, initialScope)("key");

        if (O.isNone(maybeKeyAttribute)) {
          return;
        }

        const keyAttribute = maybeKeyAttribute.value;

        if (keyAttribute.type !== NodeType.JSXSpreadAttribute) {
          return;
        }

        context.report({
          messageId: "NO_SPREADING_KEY",
          node: keyAttribute,
        });
      },
    };
  },
});
