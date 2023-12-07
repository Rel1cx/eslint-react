import { isUnstableAssignmentPattern, NodeType, readableNodeType } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/core";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-default-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function hasUsedObjectDestructuringSyntax(
  params: TSESTree.FunctionExpression["params"],
): params is [TSESTree.ObjectPattern] {
  if (params.length !== 1) {
    return false;
  }
  const [param] = params;

  return param?.type === NodeType.ObjectPattern;
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of unstable value as default param in function component",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSTABLE_DEFAULT_PROPS:
        "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable instead of {{forbiddenType}}.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { node: component } of components.values()) {
          const { params } = component;
          if (!hasUsedObjectDestructuringSyntax(params)) {
            continue;
          }
          const [{ properties }] = params;
          for (const prop of properties) {
            if (prop.type !== NodeType.Property || prop.value.type !== NodeType.AssignmentPattern) {
              continue;
            }
            const { value } = prop;
            const { right } = value;
            if (!isUnstableAssignmentPattern(value)) {
              continue;
            }
            const forbiddenType = readableNodeType(right);
            context.report({
              data: {
                forbiddenType,
              },
              messageId: "NO_UNSTABLE_DEFAULT_PROPS",
              node: right,
            });
          }
        }
      },
    };
  },
});
