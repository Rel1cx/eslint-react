import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
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
  if (AST.isTypeExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === T.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === T.MemberExpression
    && AST.isThisExpression(left.object)
    && O.exists(getName(left.property), name => name === "state")
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
    function getReportDescriptor(node: TSESTree.AssignmentExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isAssignmentToThisState(node)) {
        return O.none();
      }
      return F.pipe(
        O.Do,
        O.bind("parentClass", () =>
          AST.findParentNodeGuard(
            node,
            AST.isOneOf([
              T.ClassDeclaration,
              T.ClassExpression,
            ]),
          )),
        O.bind("parentConstructor", () => AST.findParentNodeGuard(node, isConstructorFunction)),
        O.filter(({ parentClass, parentConstructor }) =>
          isClassComponent(parentClass)
          && context.sourceCode.getScope(node).block !== parentConstructor
        ),
        O.map(() => ({
          messageId: "noDirectMutationState",
          node,
        })),
      );
    }
    return {
      AssignmentExpression: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
