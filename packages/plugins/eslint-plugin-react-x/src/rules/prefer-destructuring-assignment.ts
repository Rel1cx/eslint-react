import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier, isFunction } from "@eslint-react/ast";
import { isComponentName, useComponentCollector } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export type MessageID = CamelCase<typeof RULE_NAME>;

type MemberExpressionWithObjectName = { object: TSESTree.Identifier } & TSESTree.MemberExpression;

function isMemberExpressionWithObjectName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
  return node.object.type === AST_NODE_TYPES.Identifier && "name" in node.object;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using destructuring assignment in component props and context",
    },
    messages: {
      preferDestructuringAssignment: "Use destructuring assignment for {{name}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

    return {
      ...listeners,
      MemberExpression(node) {
        if (isMemberExpressionWithObjectName(node)) {
          const scope = context.sourceCode.getScope(node);

          memberExpressionWithNames.push([scope, node]);
        }
      },

      "Program:exit"(node) {
        const components = Array.from(ctx.getAllComponents(node).values());
        function isFunctionComponent(block: TSESTree.Node): block is TSESTreeFunction {
          if (!isFunction(block)) return false;
          const maybeId = getFunctionIdentifier(block);

          return O.isSome(maybeId)
            && isComponentName(maybeId.value.name)
            && components.some((component) => component.node === block);
        }

        for (const [initialScope, memberExpression] of memberExpressionWithNames) {
          let scope = initialScope;
          let isComponent = isFunctionComponent(scope.block);
          while (
            !isComponent
            && scope.upper
            && scope.upper !== scope
          ) {
            scope = scope.upper;
            isComponent = isFunctionComponent(scope.block);
          }
          if (!isComponent) continue;
          const component = scope.block;
          if (!("params" in component)) continue;
          const [props, ctx] = component.params;
          const isMatch = isMatching({ name: memberExpression.object.name });
          if (isMatch(props)) {
            context.report({
              messageId: "preferDestructuringAssignment",
              node: memberExpression,
              data: {
                name: "props",
              },
            });
          }
          if (isMatch(ctx)) {
            context.report({
              messageId: "preferDestructuringAssignment",
              node: memberExpression,
              data: {
                name: "context",
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
