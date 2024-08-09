import { is } from "@eslint-react/ast";
import { findPropInAttributes } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow implicit 'key' props",
    },
    messages: {
      noImplicitKey: "Do not use implicit 'key' props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const keyPropFound = findPropInAttributes(node.attributes, initialScope)("key");
        const keyPropOnElement = node.attributes.some(n => is(AST_NODE_TYPES.JSXAttribute)(n) && n.name.name === "key");
        if (O.isSome(keyPropFound) && !keyPropOnElement) {
          context.report({ messageId: "noImplicitKey", node });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
