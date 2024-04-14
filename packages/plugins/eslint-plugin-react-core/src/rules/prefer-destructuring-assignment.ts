import { getFunctionIdentifier, isFunction, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { isComponentName, useComponentCollector } from "@eslint-react/core";
import type { Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { MutableRef as MutRef, Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type MemberExpressionWithObjectName = { object: TSESTree.Identifier } & TSESTree.MemberExpression;

function isMemberExpressionWithObjectName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
  return node.object.type === NodeType.Identifier && "name" in node.object;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using destructuring assignment in component props and context",
      recommended: "recommended",
    },
    messages: {
      PREFER_DESTRUCTURING_ASSIGNMENT: "Prefer destructuring assignment.",
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
          if (!MutRef.get(isComponentRef)) continue;
          const component = MutRef.get(scopeRef).block;
          if (!("params" in component)) continue;
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
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
