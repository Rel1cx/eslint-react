import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-will-update";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentWillUpdate(node: TSESTree.Node) {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentWillUpdate'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentWillUpdate:
        "Do not call `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentWillUpdate")) {
      return {};
    }
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (!isThisSetState(node)) {
          return;
        }
        const clazz = AST.findParentNodeGuard(node, isClassComponent);
        const method = clazz && AST.findParentNodeStop(node, clazz, isComponentWillUpdate);
        const methodScope = method && context.sourceCode.getScope(method);
        const upperScope = context.sourceCode.getScope(node).upper;
        if (
          clazz
          && method
          && method.parent === clazz.body
          && upperScope === methodScope
        ) {
          context.report({
            messageId: "noSetStateInComponentWillUpdate",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
