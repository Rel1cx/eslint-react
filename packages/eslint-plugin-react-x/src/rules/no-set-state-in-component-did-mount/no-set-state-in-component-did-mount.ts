import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-set-state-in-component-did-mount";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows calling 'this.setState' in 'componentDidMount' outside functions such as callbacks.",
    },
    messages: {
      default: "Do not call `this.setState` in `componentDidMount` outside functions such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `componentDidMount` is not present in the file
  if (!context.sourceCode.text.includes("componentDidMount")) return {};
  return merge(
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (!core.isThisSetStateCall(node)) {
          return;
        }
        // Find the enclosing class component
        const enclosingClassNode = ast.findParent(node, core.isClassComponent);
        // Find the enclosing 'componentDidMount' method
        const enclosingMethodNode = ast.findParent(
          node,
          (n) => n === enclosingClassNode || core.isComponentDidMount(n),
        );

        // Ensure 'this.setState' is inside a 'componentDidMount' method within a class component
        if (enclosingClassNode == null || enclosingMethodNode == null || enclosingMethodNode === enclosingClassNode) {
          return;
        }

        // Get the scope of the 'componentDidMount' method
        const enclosingMethodScope = context.sourceCode.getScope(enclosingMethodNode);
        // Get the scope where 'this.setState' is called
        const setStateCallParentScope = context.sourceCode.getScope(node).upper;

        // Report an error if 'this.setState' is called directly inside 'componentDidMount'
        if (
          enclosingMethodNode.parent === enclosingClassNode.body && setStateCallParentScope === enclosingMethodScope
        ) {
          context.report({
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
