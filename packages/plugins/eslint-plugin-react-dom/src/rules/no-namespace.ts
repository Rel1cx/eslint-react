import { elementType, isCreateElementCall } from "@eslint-react/jsx";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Predicate as Prd } from "effect";

import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export type MessageID = "NO_NAMESPACE";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that namespaces are not used in React elements",
    },
    messages: {
      NO_NAMESPACE: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (
          isCreateElementCall(node, context)
          && node.arguments.length > 0
          && node.arguments[0]?.type === AST_NODE_TYPES.Literal
        ) {
          const name = node.arguments[0].value;
          if (!Prd.isString(name) || !name.includes(":")) return;
          context.report({
            data: {
              name,
            },
            messageId: "NO_NAMESPACE",
            node,
          });
        }
      },
      JSXOpeningElement(node) {
        const name = elementType(node);
        if (!Prd.isString(name) || !name.includes(":")) return;
        context.report({
          data: {
            name,
          },
          messageId: "NO_NAMESPACE",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
