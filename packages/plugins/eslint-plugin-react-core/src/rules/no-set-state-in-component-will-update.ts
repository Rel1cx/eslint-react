import { isOneOf, NodeType, traverseUp } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-will-update";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === NodeType.MemberExpression
    && callee.object.type === NodeType.ThisExpression
    && callee.property.type === NodeType.Identifier
    && callee.property.name === "setState"
  );
}

function isComponentWillUpdate(node: TSESTree.Node) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "componentWillUpdate";
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `setState` in `componentWillUpdate`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_SET_STATE_IN_COMPONENT_WILL_UPDATE: "Do not use `setState` in `componentWillUpdate`.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        const maybeParentClass = traverseUp(node, isOneOf([NodeType.ClassDeclaration, NodeType.ClassExpression]));
        if (O.isNone(maybeParentClass)) return;
        const parentClass = maybeParentClass.value;
        if (!isClassComponent(parentClass, context)) return;
        const maybeParentMethod = traverseUp(node, isComponentWillUpdate);
        if (O.isNone(maybeParentMethod)) return;
        const parentMethod = maybeParentMethod.value;
        if (parentMethod.parent !== parentClass.body) return;
        if (context.sourceCode.getScope?.(node).upper !== context.sourceCode.getScope?.(parentMethod)) return;
        context.report({
          node,
          messageId: "NO_SET_STATE_IN_COMPONENT_WILL_UPDATE",
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
