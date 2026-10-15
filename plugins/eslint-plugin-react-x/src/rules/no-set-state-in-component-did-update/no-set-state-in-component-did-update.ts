import { createRule } from "@/utils/create-rule";
import { Check, Extract, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-set-state-in-component-did-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows calling 'this.setState' in 'componentDidUpdate' outside functions such as callbacks.",
    },
    messages: {
      default: "Do not call `this.setState` in `componentDidUpdate` outside functions such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentDidUpdate` is not present in the file
  if (!context.sourceCode.text.includes("componentDidUpdate")) return {};
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isThisSetStateCall(node)) return;
      // Find the enclosing class component
      const component = Traverse.findParent(node, core.isClassComponent);
      if (component == null) return;
      // Find the enclosing 'componentDidUpdate' method, without crossing the class boundary
      const method = Traverse.findParent(node, core.isComponentDidUpdate, (n) => n === component);
      if (method == null) return;
      // Report an error if 'this.setState' is called directly inside 'componentDidUpdate':
      // the nearest enclosing function or class of the call must be the lifecycle function
      // itself (a nested callback or class field initializer defers the call)
      const lifecycleFunction = method.value == null ? null : Extract.unwrap(method.value);
      if (
        method.parent === component.body
        && lifecycleFunction != null
        && lifecycleFunction === Traverse.findParent(node, Check.isFunctionOrClass)
      ) {
        context.report({
          messageId: "default",
          node,
        });
      }
    },
  };
}
