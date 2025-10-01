import * as AST from "@eslint-react/ast";
import { isClassComponent, isComponentWillUpdate, isThisSetState } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-will-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentWillUpdate:
        "Do not call `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillUpdate` is not present in the file
  if (!context.sourceCode.text.includes("componentWillUpdate")) return {};
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!isThisSetState(node)) {
        return;
      }
      // Find the enclosing class component
      const enclosingClassNode = AST.findParentNode(node, isClassComponent);
      // Find the enclosing 'componentWillUpdate' method
      const enclosingMethodNode = AST.findParentNode(node, (n) => n === enclosingClassNode || isComponentWillUpdate(n));

      // Ensure 'this.setState' is inside a 'componentWillUpdate' method within a class component
      if (enclosingClassNode == null || enclosingMethodNode == null || enclosingMethodNode === enclosingClassNode) {
        return;
      }

      // Get the scope of the 'componentWillUpdate' method
      const enclosingMethodScope = context.sourceCode.getScope(enclosingMethodNode);
      // Get the scope where 'this.setState' is called
      const setStateCallParentScope = context.sourceCode.getScope(node).upper;

      // Report an error if 'this.setState' is called directly inside 'componentWillUpdate'
      if (enclosingMethodNode.parent === enclosingClassNode.body && setStateCallParentScope === enclosingMethodScope) {
        context.report({
          messageId: "noSetStateInComponentWillUpdate",
          node,
        });
      }
    },
  };
}
