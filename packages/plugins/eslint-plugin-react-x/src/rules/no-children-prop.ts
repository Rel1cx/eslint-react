import { isCreateElementCall } from "@eslint-react/core";
import { findPropInProperties, getProp } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing 'children' as props",
    },
    messages: {
      noChildrenProp: "Do not pass 'children' as props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (node.arguments.length === 0) return;
        const initialScope = context.sourceCode.getScope(node);
        if (!isCreateElementCall(node, context)) return;
        const [_, props] = node.arguments;
        if (!props || props.type !== AST_NODE_TYPES.ObjectExpression) return;
        O.map(findPropInProperties(props.properties, initialScope)("children"), prop => {
          context.report({
            messageId: "noChildrenProp",
            node: prop,
          });
        });
      },
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        O.map(getProp(node.openingElement.attributes, "children", initialScope), prop => {
          context.report({
            messageId: "noChildrenProp",
            node: prop,
          });
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
