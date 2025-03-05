import * as AST from "@eslint-react/ast";
import { isAssignmentToThisState, isClassComponent } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isConstructorFunction(
  node: TSESTree.Node,
): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return AST.isOneOf([T.FunctionDeclaration, T.FunctionExpression])(node)
    && AST.isMethodOrProperty(node.parent)
    && node.parent.key.type === T.Identifier
    && node.parent.key.name === "constructor";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct mutation of state",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectMutationState: "Do not mutate state directly. Use 'setState()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (!isAssignmentToThisState(node)) {
          return;
        }
        const parentClass = AST.findParentNode(
          node,
          AST.isOneOf([
            T.ClassDeclaration,
            T.ClassExpression,
          ]),
        );
        if (parentClass == null) return;
        if (
          isClassComponent(parentClass)
          && context.sourceCode.getScope(node).block !== AST.findParentNode(node, isConstructorFunction)
        ) {
          context.report({
            messageId: "noDirectMutationState",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
