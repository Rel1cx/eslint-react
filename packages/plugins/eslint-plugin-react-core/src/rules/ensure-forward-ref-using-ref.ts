// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3667
import { isFunction } from "@eslint-react/ast";
import { isForwardRefCall } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-forward-ref-using-ref";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "require all 'forwardRef' components include a 'ref' parameter",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      ENSURE_FORWARD_REF_USING_REF: "'forwardRef' is used with this component but no 'ref' parameter is set",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isForwardRefCall(node, context)) return;
        const [component] = node.arguments;
        if (!component || !isFunction(component)) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [props, ref] = component.params;
        if (!ref) {
          context.report({
            messageId: "ENSURE_FORWARD_REF_USING_REF",
            node: component,
          });
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
