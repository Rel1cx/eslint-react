import { isOneOf, NodeType, traverseUp } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-update";

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

function isComponentDidUpdate(node: TSESTree.Node) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "componentDidUpdate";
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `setState` in `componentDidUpdate`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_SET_STATE_IN_COMPONENT_DID_UPDATE: "Do not use `setState` in `componentDidUpdate`.",
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
        const maybeParentMethod = traverseUp(node, isComponentDidUpdate);
        if (O.isNone(maybeParentMethod)) return;
        const parentMethod = maybeParentMethod.value;
        if (parentMethod.parent !== parentClass.body) return;
        if (context.sourceCode.getScope?.(node).upper !== context.sourceCode.getScope?.(parentMethod)) return;
        context.report({
          node,
          messageId: "NO_SET_STATE_IN_COMPONENT_DID_UPDATE",
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
