import { createRule } from "@/utils/create-rule";
import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-access-state-in-setstate";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows accessing 'this.state' inside 'setState' calls.",
    },
    messages: {
      default: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `setState` is not present in the file
  if (!context.sourceCode.text.includes("setState")) {
    return {};
  }

  return {
    MemberExpression(node) {
      if (!core.isAPI("this.state")(context, node)) return;
      // dprint-ignore
      const fact = Traverse.findParent(Traverse.findParent(node, (n) => Check.is(AST.CallExpression)(n) && core.isThisSetStateCall(n)), (n) => Check.isClass(n))
      if (fact == null || !core.isClassComponent(fact)) return;
      context.report({
        messageId: "default",
        node,
      });
    },
  };
}
