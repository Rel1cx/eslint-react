import { NodeType } from "@eslint-react/ast";
import { getParentClassComponent } from "@eslint-react/core";
import { O, P } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
  return value?.type === NodeType.Literal && P.isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
  if (value?.type !== NodeType.JSXExpressionContainer) {
    return false;
  }

  if (value.expression.type === NodeType.Literal) {
    return P.isString(value.expression.value);
  }

  return value.expression.type === NodeType.TemplateLiteral;
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow using deprecated string refs",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_STRING_REFS: "String refs are deprecated. Use callback refs instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== "ref") {
          return;
        }
        if (containsStringLiteral(node) || containsStringExpressionContainer(node)) {
          context.report({
            messageId: "NO_STRING_REFS",
            node,
          });
        }
      },
      MemberExpression(node) {
        const parentClassComponent = getParentClassComponent(context);

        if (O.isNone(parentClassComponent)) {
          return;
        }

        // Check if the member expression is `this.refs`
        return node.object.type === NodeType.ThisExpression
          && "name" in node.property
          && node.property.name === "refs";
      },
    };
  },
});
