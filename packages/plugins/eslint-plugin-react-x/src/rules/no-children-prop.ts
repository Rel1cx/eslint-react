import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInProperties, getProp } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing of 'children' as props",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_CHILDREN_PROP: "Do not pass children as props.",
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
        if (!props || props.type !== NodeType.ObjectExpression) return;
        O.map(findPropInProperties(props.properties, context, initialScope)("children"), prop => {
          context.report({
            messageId: "NO_CHILDREN_PROP",
            node: prop,
          });
        });
      },
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        O.map(getProp(node.openingElement.attributes, "children", context, initialScope), prop => {
          context.report({
            messageId: "NO_CHILDREN_PROP",
            node: prop,
          });
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
