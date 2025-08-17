import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type MemberExpressionWithObjectName = { object: TSESTree.Identifier } & TSESTree.MemberExpression;

function isMemberExpressionWithObjectName(node: TSESTree.MemberExpression): node is MemberExpressionWithObjectName {
  return node.object.type === T.Identifier && "name" in node.object;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces destructuring assignment for component props and context.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      preferDestructuringAssignment: "Use destructuring assignment for {{name}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useComponentCollector(context);
  const memberExpressionWithNames: [Scope, MemberExpressionWithObjectName][] = [];

  return {
    ...listeners,
    MemberExpression(node) {
      if (isMemberExpressionWithObjectName(node)) {
        const scope = context.sourceCode.getScope(node);

        memberExpressionWithNames.push([scope, node]);
      }
    },

    "Program:exit"(program) {
      const components = [
        ...ctx
          .getAllComponents(program)
          .values(),
      ];
      function isFunctionComponent(block: TSESTree.Node): block is AST.TSESTreeFunction {
        if (!AST.isFunction(block)) {
          return false;
        }
        const id = AST.getFunctionId(block);
        return id != null
          && ER.isComponentNameLoose(id.name)
          && components.some((component) => component.node === block);
      }

      for (const [initialScope, memberExpression] of memberExpressionWithNames) {
        let scope = initialScope;
        let isComponent = isFunctionComponent(scope.block);
        while (
          !isComponent
          && scope.upper != null
          && scope.upper !== scope
        ) {
          scope = scope.upper;
          isComponent = isFunctionComponent(scope.block);
        }
        if (!isComponent) {
          continue;
        }
        const component = scope.block;
        if (!("params" in component)) {
          continue;
        }
        const [props, ctx] = component.params;
        const isMatch = (node: null | TSESTree.Node | undefined) =>
          node != null
          && node.type === T.Identifier
          && node.name === memberExpression.object.name;
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
}
