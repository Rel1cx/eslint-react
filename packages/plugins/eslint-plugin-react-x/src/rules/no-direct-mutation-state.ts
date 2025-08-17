import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
      description: "Disallow direct mutation of `this.state`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectMutationState: "Do not mutate state directly. Use 'setState()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      if (!ER.isAssignmentToThisState(node)) return;
      const parentClass = AST.findParentNode(
        node,
        AST.isOneOf([
          T.ClassDeclaration,
          T.ClassExpression,
        ]),
      );
      if (parentClass == null) return;
      if (
        ER.isClassComponent(parentClass)
        && context.sourceCode.getScope(node).block !== AST.findParentNode(node, isConstructorFunction)
      ) {
        context.report({
          messageId: "noDirectMutationState",
          node,
        });
      }
    },
  };
}
