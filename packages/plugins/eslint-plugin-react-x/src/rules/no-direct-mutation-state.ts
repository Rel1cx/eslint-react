import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): string | _ {
  if (AST.isTypeExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === T.Literal) {
    return node.value?.toString();
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw;
  }

  return _;
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === T.MemberExpression
    && AST.isThisExpression(left.object)
    && getName(left.property) === "state"
  );
}

function isConstructorFunction(
  node: TSESTree.Node,
): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return AST.isOneOf([T.FunctionDeclaration, T.FunctionExpression])(node)
    && AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node.parent)
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
        const parentClass = AST.findParentNodeGuard(
          node,
          AST.isOneOf([
            T.ClassDeclaration,
            T.ClassExpression,
          ]),
        );
        if (!parentClass) return;
        if (
          isClassComponent(parentClass)
          && context.sourceCode.getScope(node).block !== AST.findParentNodeGuard(node, isConstructorFunction)
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
