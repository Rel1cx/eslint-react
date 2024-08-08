import { isOneOf, traverseUp } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-mount";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === AST_NODE_TYPES.MemberExpression
    && callee.object.type === AST_NODE_TYPES.ThisExpression
    && callee.property.type === AST_NODE_TYPES.Identifier
    && callee.property.name === "setState"
  );
}

function isComponentDidMount(node: TSESTree.Node) {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentDidMount";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentDidMount'",
    },
    messages: {
      noSetStateInComponentDidMount:
        "Do not call `this.setState` in `componentDidMount` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        const maybeParentClass = traverseUp(
          node,
          isOneOf([AST_NODE_TYPES.ClassDeclaration, AST_NODE_TYPES.ClassExpression]),
        );
        if (O.isNone(maybeParentClass)) return;
        const parentClass = maybeParentClass.value;
        if (!isClassComponent(parentClass)) return;
        const maybeParentMethod = traverseUp(node, isComponentDidMount);
        if (O.isNone(maybeParentMethod)) return;
        const parentMethod = maybeParentMethod.value;
        if (parentMethod.parent !== parentClass.body) return;
        if (context.sourceCode.getScope(node).upper !== context.sourceCode.getScope(parentMethod)) return;
        context.report({
          messageId: "noSetStateInComponentDidMount",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
