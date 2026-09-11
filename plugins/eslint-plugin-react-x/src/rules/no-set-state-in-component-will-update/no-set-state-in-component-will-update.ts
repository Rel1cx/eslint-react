/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-set-state-in-component-will-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows calling 'this.setState' in 'componentWillUpdate' outside functions such as callbacks.",
    },
    messages: {
      default: "Do not call `this.setState` in `componentWillUpdate` outside functions such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillUpdate` is not present in the file
  if (!context.hasText("componentWillUpdate")) return {};
  const src = context.src;
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isThisSetStateCall(node)) {
        return;
      }
      // Find the enclosing class component
      const enclosingClassNode = Traverse.findParent(node, core.isClassComponent);
      // Find the enclosing 'componentWillUpdate' method
      const enclosingMethodNode = Traverse.findParent(
        node,
        (n) => n === enclosingClassNode || core.isComponentWillUpdate(n),
      );

      // Ensure 'this.setState' is inside a 'componentWillUpdate' method within a class component
      if (enclosingClassNode == null || enclosingMethodNode == null || enclosingMethodNode === enclosingClassNode) {
        return;
      }

      // Get the scope of the 'componentWillUpdate' method
      const enclosingMethodScope = src.getScope(enclosingMethodNode);
      // Get the scope where 'this.setState' is called
      const setStateCallParentScope = src.getScope(node).upper;

      // Report an error if 'this.setState' is called directly inside 'componentWillUpdate'
      if (enclosingMethodNode.parent === enclosingClassNode.body && setStateCallParentScope === enclosingMethodScope) {
        context.report({
          messageId: "default",
          node,
        });
      }
    },
  };
}
