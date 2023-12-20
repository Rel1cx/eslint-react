// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import { getNestedCallExpressions } from "@eslint-react/ast";
import { isReactHookCall, isUseStateCall } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// variables should be defined here
const ALLOW_LIST = Object.freeze(["Boolean", "String", "Number"]);

// rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow function calls in `useState` that aren't wrapped in an initializer function",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      PREFER_USE_STATE_LAZY_INITIALIZATION:
        "To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: `useState(() => getValue())`",
    },
  },
  defaultOptions: [],
  create(context) {
    const pragma = getPragmaFromContext(context);

    return {
      CallExpression(node) {
        if (!isReactHookCall(node) || !isUseStateCall(node, context, pragma)) {
          return;
        }

        const [useStateInput] = node.arguments;

        if (!useStateInput) {
          return;
        }

        const nestedCallExpressions = getNestedCallExpressions(useStateInput);

        const hasFunctionCall = nestedCallExpressions.some((n) => {
          return "name" in n.callee
            && !ALLOW_LIST.includes(n.callee.name);
        });

        if (!hasFunctionCall) {
          return;
        }

        context.report({
          node: useStateInput,
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
        });
      },
    };
  },
});
