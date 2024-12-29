import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (AST.isTypeOnlyExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === AST_NODE_TYPES.Identifier || node.type === AST_NODE_TYPES.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === AST_NODE_TYPES.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === AST_NODE_TYPES.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === AST_NODE_TYPES.MemberExpression
    && AST.isThisExpression(left.object)
    && O.exists(getName(left.property), name => name === "state")
  );
}

function isConstructorFunction(
  node: TSESTree.Node,
): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return AST.isOneOf([AST_NODE_TYPES.FunctionDeclaration, AST_NODE_TYPES.FunctionExpression])(node)
    && AST.isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node.parent)
    && node.parent.key.type === AST_NODE_TYPES.Identifier
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
    function getReportDescriptor(node: TSESTree.AssignmentExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isAssignmentToThisState(node)) return O.none();
      const maybeParentClass = AST.traverseUpGuard(
        node,
        AST.isOneOf([AST_NODE_TYPES.ClassDeclaration, AST_NODE_TYPES.ClassExpression]),
      );
      if (O.isNone(maybeParentClass)) return O.none();
      const parentClass = maybeParentClass.value;
      if (!isClassComponent(parentClass)) return O.none();
      const maybeParentConstructor = AST.traverseUpGuard(node, isConstructorFunction);
      if (O.exists(maybeParentConstructor, n => context.sourceCode.getScope(node).block === n)) return O.none();
      return O.some({
        messageId: "noDirectMutationState",
        node,
      });
    }
    return {
      AssignmentExpression: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
