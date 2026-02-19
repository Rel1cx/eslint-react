// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3667
import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-forward-ref";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows useless 'forwardRef' calls on components that don't use 'ref's.",
    },
    messages: {
      default: "A 'forwardRef' is used with this component but no 'ref' parameter is set.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      CallExpression(node) {
        if (!core.isForwardRefCall(context, node)) {
          return;
        }
        const [component] = node.arguments;
        if (component == null || !ast.isFunction(component)) {
          return;
        }
        const ref = component.params[1];
        if (ref != null) {
          return;
        }
        context.report({
          messageId: "default",
          node: node.callee,
        });
      },
    },
  );
}
