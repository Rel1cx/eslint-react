import { isOneOf } from "@eslint-react/ast";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export type MessageID = CamelCase<typeof RULE_NAME>;

const banParentTypes = [
  AST_NODE_TYPES.VariableDeclarator,
  AST_NODE_TYPES.Property,
  AST_NODE_TYPES.ReturnStatement,
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.AssignmentExpression,
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
        if (callee.type !== AST_NODE_TYPES.MemberExpression) return;
        if (callee.object.type !== AST_NODE_TYPES.Identifier) return;
        if (!("name" in callee.object)) return;
        const objectName = callee.object.name;
        if (
          objectName.toLowerCase() !== "reactdom"
          || callee.property.type !== AST_NODE_TYPES.Identifier
          || callee.property.name !== "render"
          || !isOneOf(banParentTypes)(parent)
        ) {
          return;
        }
        context.report({
          messageId: "noRenderReturnValue",
          node,
          data: {
            objectName,
          },
        });
      },
    };
  },
  defaultOptions: [],
});
