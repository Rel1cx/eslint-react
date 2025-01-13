import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-update";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentDidUpdate(node: TSESTree.Node) {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentDidUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentDidUpdate'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentDidUpdate:
        "Do not call `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentDidUpdate")) {
      return {};
    }
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (!isThisSetState(node)) {
          return;
        }
        const clazz = AST.findParentNode(node, isClassComponent);
        const method = AST.findParentNode(node, (n) => n === clazz || isComponentDidUpdate(n));
        if (clazz == null || method == null || method === clazz) return;
        const methodScope = context.sourceCode.getScope(method);
        const upperScope = context.sourceCode.getScope(node).upper;
        if (
          method.parent === clazz.body
          && upperScope === methodScope
        ) {
          context.report({
            messageId: "noSetStateInComponentDidUpdate",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
