import { getFunctionIdentifier, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector, isValidReactComponentName } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

type MessageID = ConstantCase<typeof RULE_NAME>;

type MemberExpressionWithObjectName = TSESTree.MemberExpression & { object: TSESTree.Identifier };

function isMemberExpressionWithObjectName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
  return node.object.type === NodeType.Identifier && "name" in node.object;
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce using destructuring assignment in component props and context",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      PREFER_DESTRUCTURING_ASSIGNMENT: "Use destructuring assignment.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);
    const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

    return {
      ...listeners,
      MemberExpression(node) {
        if (isMemberExpressionWithObjectName(node)) {
          memberExpressionWithNames.push([context.getScope(), node]);
        }
      },

      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          console.error(maybeComponents.left);

          return;
        }

        const components = maybeComponents.right;
        function isFunctionComponent(block: TSESTree.Node): block is TSESTreeFunction {
          if (!isFunction(block)) {
            return false;
          }

          const id = getFunctionIdentifier(block);

          return !!id && isValidReactComponentName(id.name) && components.includes(block);
        }

        // eslint-disable-next-line prefer-const
        for (let [scope, memberExpression] of memberExpressionWithNames) {
          let isComponent = isFunctionComponent(scope.block);

          while (!isComponent && scope.upper && scope.upper !== scope) {
            isComponent = isFunctionComponent(scope.upper.block);
            scope = scope.upper;
          }

          if (!isComponent) {
            continue;
          }

          const component = scope.block;

          if (!("params" in component)) {
            continue;
          }

          const [props, ctx] = component.params;

          const isMatch = isMatching({ name: memberExpression.object.name });

          if (isMatch(props)) {
            context.report({
              messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
              node: memberExpression,
            });
          }

          if (isMatch(ctx)) {
            context.report({
              messageId: "PREFER_DESTRUCTURING_ASSIGNMENT",
              node: memberExpression,
            });
          }
        }
      },
    };
  },
});
