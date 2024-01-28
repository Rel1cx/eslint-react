import { isOneOf, NodeType } from "@eslint-react/ast";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const banParentTypes = [
  NodeType.VariableDeclarator,
  NodeType.Property,
  NodeType.ReturnStatement,
  NodeType.ArrowFunctionExpression,
  NodeType.AssignmentExpression,
] as const;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of the return value of `ReactDOM.render`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_RENDER_RETURN_VALUE: "Do not depend on the return value from {{objectName}}.render",
    },
  },
  defaultOptions: [],
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
          messageId: "NO_RENDER_RETURN_VALUE",
          node,
          data: {
            objectName,
          },
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
