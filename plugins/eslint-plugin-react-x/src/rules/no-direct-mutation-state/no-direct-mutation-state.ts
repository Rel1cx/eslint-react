import { createRule } from "@/utils/create-rule";
import { Check, Extract, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-direct-mutation-state";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows direct mutation of 'this.state'.",
    },
    messages: {
      default: "Do not mutate state directly. Use 'setState()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `Component` is not present in the file
  if (!context.sourceCode.text.includes("Component")) return {};
  return {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      if (!isAssignmentToThisState(node)) return;
      const fact = Traverse.findParent(node, Check.isClass);
      if (fact == null || !core.isClassComponent(fact)) return;
      // Allow synchronous constructor initialization, including nested blocks.
      // A nested function (callback) is not the constructor, so it is reported.
      const constructor = Traverse.findParent(node, isConstructorFunction);
      const enclosing = Traverse.findParent(node, Check.isFunctionOrClass);
      if (enclosing === constructor) return;
      context.report({
        messageId: "default",
        node,
      });
    },
  };
}

/**
 * Checks whether a node is the function value of a `constructor` method or property.
 * @param node The node to inspect.
 * @returns `true` if the node is a constructor function, `false` otherwise.
 */
function isConstructorFunction(node: TSESTree.Node): node is TSESTree.FunctionDeclaration | TSESTree.FunctionExpression {
  return Check.isOneOf([AST.FunctionDeclaration, AST.FunctionExpression])(node)
    && Check.isPropertyOrMethod(node.parent)
    && Check.isIdentifier(node.parent.key, "constructor");
}

/**
 * Checks whether an assignment target mutates `this.state` directly.
 * @param node The assignment expression to inspect.
 * @returns `true` if the target is `this.state` or a nested member of it, `false` otherwise.
 */
function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;
  let current: TSESTree.Node = Extract.unwrap(left);
  while (current.type === AST.MemberExpression) {
    const object: TSESTree.Node = Extract.unwrap(current.object);
    const property = current.property;
    if (object.type === AST.ThisExpression && Check.isIdentifier(property, "state")) {
      return true;
    }
    current = object;
  }
  return false;
}
