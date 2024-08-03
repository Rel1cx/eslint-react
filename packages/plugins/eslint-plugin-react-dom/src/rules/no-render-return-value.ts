import { isOneOf, NodeType } from "@eslint-react/ast";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export type MessageID = CamelCase<typeof RULE_NAME>;

const banParentTypes = [
  NodeType.VariableDeclarator,
  NodeType.Property,
  NodeType.ReturnStatement,
  NodeType.ArrowFunctionExpression,
  NodeType.AssignmentExpression,
] as const;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of the return value of 'ReactDOM.render'",
    },
    messages: {
      noRenderReturnValue: "Do not depend on the return value from '{{objectName}}.render'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        const { callee, parent } = node;
        if (callee.type !== NodeType.MemberExpression) return;
        if (callee.object.type !== NodeType.Identifier) return;
        if (!("name" in callee.object)) return;
        const objectName = callee.object.name;
        if (
          objectName.toLowerCase() !== "reactdom"
          || callee.property.type !== NodeType.Identifier
          || callee.property.name !== "render"
          || !isOneOf(banParentTypes)(parent)
        ) {
          return;
        }
        context.report({
          data: {
            objectName,
          },
          messageId: "noRenderReturnValue",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
