import * as AST from "@eslint-react/ast";
import { isComponentNameLoose, useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
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
  const { ctx, listeners } = useComponentCollector(context);
  // Store all member expressions with their scope
  const exprs: [Scope, MemberExpressionWithObjectName][] = [];

  return {
    ...listeners,
    // Collect all member expressions (e.g., `props.name`) to check later
    MemberExpression(node) {
      if (isMemberExpressionWithObjectName(node)) {
        const scope = context.sourceCode.getScope(node);

        exprs.push([scope, node]);
      }
    },

    // After traversing the whole AST, check the collected member expressions
    "Program:exit"(program) {
      const componentBlocks = new Set(ctx.getAllComponents(program).map((component) => component.node));
      // Check if a node is a function component collected by `useComponentCollector`
      function isFunctionComponent(block: TSESTree.Node): block is AST.TSESTreeFunction {
        if (!AST.isFunction(block)) {
          return false;
        }
        const id = AST.getFunctionId(block);
        return id != null
          && isComponentNameLoose(id.name)
          && componentBlocks.has(block);
      }

      // For each member expression, find its parent component
      for (const [initialScope, expr] of exprs) {
        let scope = initialScope;
        let isComponent = isFunctionComponent(scope.block);
        // Traverse up the scope chain to find the component scope
        while (!isComponent && scope.upper != null && scope.upper !== scope) {
          scope = scope.upper;
          isComponent = isFunctionComponent(scope.block);
        }
        // If no component scope is found, skip
        if (!isComponent) {
          continue;
        }
        const component = scope.block;
        if (!("params" in component)) {
          continue;
        }
        const props = component.params.at(0);
        // Check if a node is an identifier with the same name as the member expression's object
        const isMatch = (node: null | TSESTree.Node | undefined) =>
          node != null
          && node.type === T.Identifier
          && node.name === expr.object.name;
        // If the member expression's object is `props`, report an error
        if (isMatch(props)) {
          context.report({
            messageId: "preferDestructuringAssignment",
            node: expr,
            data: {
              name: "props",
            },
          });
        }
      }
    },
  };
}
