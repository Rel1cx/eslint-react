import { is, NodeType } from "@eslint-react/ast";
import { findPropInAttributes } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow implicit 'key' props",
    },
    messages: {
      NO_IMPLICIT_KEY: "Do not use implicit 'key' props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const keyPropFound = findPropInAttributes(node.attributes, context, initialScope)("key");
        const keyPropOnElement = node.attributes.some(n => is(NodeType.JSXAttribute)(n) && n.name.name === "key");
        if (O.isSome(keyPropFound) && !keyPropOnElement) {
          context.report({ messageId: "NO_IMPLICIT_KEY", node });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
