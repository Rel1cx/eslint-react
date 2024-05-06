import { isOneOf, isThisExpression, NodeType, traverseUpGuard } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-mutation-state";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === NodeType.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === NodeType.Identifier || node.type === NodeType.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === NodeType.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === NodeType.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === NodeType.MemberExpression
    && isThisExpression(left.object)
    && O.exists(getName(left.property), name => name === "state")
  );
}

function isConstructorFunction(
  node: TSESTree.Node,
): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return isOneOf([NodeType.FunctionDeclaration, NodeType.FunctionExpression])(node)
    && isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node.parent)
    && node.parent.key.type === NodeType.Identifier
    && node.parent.key.name === "constructor"
    && node.parent.parent.type === NodeType.ClassBody;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct mutation of state",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_DIRECT_MUTATION_STATE: "Do not mutate state directly. Use 'setState()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      AssignmentExpression(node) {
        if (!isAssignmentToThisState(node)) return;
        const maybeParentClass = traverseUpGuard(node, isOneOf([NodeType.ClassDeclaration, NodeType.ClassExpression]));
        if (O.isNone(maybeParentClass)) return;
        const parentClass = maybeParentClass.value;
        if (!isClassComponent(parentClass)) return;
        const maybeParentConstructor = traverseUpGuard(node, isConstructorFunction);
        if (O.exists(maybeParentConstructor, n => context.sourceCode.getScope(node).block === n)) return;
        context.report({
          messageId: "NO_DIRECT_MUTATION_STATE",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
