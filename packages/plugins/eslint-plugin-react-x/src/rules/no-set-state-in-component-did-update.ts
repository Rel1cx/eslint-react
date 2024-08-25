import { isOneOf, traverseUp } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-update";

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

function isComponentDidUpdate(node: TSESTree.Node) {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentDidUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentDidUpdate'",
    },
    messages: {
      noSetStateInComponentDidUpdate:
        "Do not call `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentDidUpdate")) return {};
    function getReportDescriptor(node: TSESTree.CallExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isThisSetState(node)) return O.none();
      const maybeParentClass = traverseUp(
        node,
        isOneOf([AST_NODE_TYPES.ClassDeclaration, AST_NODE_TYPES.ClassExpression]),
      );
      if (O.isNone(maybeParentClass)) return O.none();
      const parentClass = maybeParentClass.value;
      if (!isClassComponent(parentClass)) return O.none();
      const maybeParentMethod = traverseUp(node, isComponentDidUpdate);
      if (O.isNone(maybeParentMethod)) return O.none();
      const parentMethod = maybeParentMethod.value;
      if (parentMethod.parent !== parentClass.body) return O.none();
      if (context.sourceCode.getScope(node).upper !== context.sourceCode.getScope(parentMethod)) return O.none();
      return O.some({
        messageId: "noSetStateInComponentDidUpdate",
        node,
      });
    }
    return {
      CallExpression: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
