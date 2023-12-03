import { getFunctionIdentifier, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector, isValidComponentName } from "@eslint-react/core";
import { E, M, MutRef, O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export type MessageID = ConstantCase<typeof RULE_NAME>;

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

        const components = Array.from(maybeComponents.right.values());
        function isFunctionComponent(block: TSESTree.Node): block is TSESTreeFunction {
          if (!isFunction(block)) {
            return false;
          }

          const maybeId = getFunctionIdentifier(block);

          return O.isSome(maybeId)
            && isValidComponentName(maybeId.value.name)
            && components.some((component) => component.node === block);
        }

        for (const [scope, memberExpression] of memberExpressionWithNames) {
          const scopeRef = MutRef.make(scope);
          const isComponentRef = MutRef.make(isFunctionComponent(scope.block));

          while (
            !MutRef.get(isComponentRef)
            && MutRef.get(scopeRef).upper
            && MutRef.get(scopeRef).upper !== MutRef.get(scopeRef)
          ) {
            MutRef.set(scopeRef, MutRef.get(scopeRef).upper);
            MutRef.set(isComponentRef, isFunctionComponent(MutRef.get(scopeRef).block));
          }

          if (!MutRef.get(isComponentRef)) {
            continue;
          }

          const component = MutRef.get(scopeRef).block;

          if (!("params" in component)) {
            continue;
          }

          const [props, ctx] = component.params;

          const isMatch = M.isMatching({ name: memberExpression.object.name });

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
