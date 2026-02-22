import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

function isConstructorFunction(
  node: TSESTree.Node,
): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return ast.isOneOf([AST.FunctionDeclaration, AST.FunctionExpression])(node)
    && ast.isMethodOrProperty(node.parent)
    && node.parent.key.type === AST.Identifier
    && node.parent.key.name === "constructor";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows direct mutation of 'this.state'.",
    },
    messages: {
      default: "Do not mutate state directly. Use 'setState()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (!core.isAssignmentToThisState(node)) return;
        // Find the parent class of the assignment
        const parentClass = ast.findParentNode(
          node,
          ast.isOneOf([
            AST.ClassDeclaration,
            AST.ClassExpression,
          ]),
        );
        // If the assignment is not inside a class, do nothing
        if (parentClass == null) return;
        // Report an error if 'this.state' is directly mutated in a class component
        // and the mutation is not inside the constructor
        if (
          core.isClassComponent(parentClass)
          && context.sourceCode.getScope(node).block !== ast.findParentNode(node, isConstructorFunction)
        ) {
          context.report({
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
