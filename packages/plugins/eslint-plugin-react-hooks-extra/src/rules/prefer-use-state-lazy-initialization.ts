// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import { getNestedCallExpressions } from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseStateCall } from "@eslint-react/core";
import { parseESLintSettings } from "@eslint-react/shared";
import { F } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// variables should be defined here
const ALLOW_LIST = ["Boolean", "String", "Number"] as const;

// rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow function calls in 'useState' that aren't wrapped in an initializer function",
    },
    messages: {
      PREFER_USE_STATE_LAZY_INITIALIZATION:
        "To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: 'useState(() => getValue())'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const alias = parseESLintSettings(context.settings)["react-x"]?.additionalHooks?.useState ?? [];
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) return;
        if (!isUseStateCall(node, context) && !alias.some(F.flip(isReactHookCallWithNameLoose)(node))) return;
        const [useStateInput] = node.arguments;
        if (!useStateInput) return;
        const nestedCallExpressions = getNestedCallExpressions(useStateInput);
        const hasFunctionCall = nestedCallExpressions.some((n) => {
          return "name" in n.callee
            && !ALLOW_LIST.includes(n.callee.name as never);
        });
        if (!hasFunctionCall) return;
        context.report({
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          node: useStateInput,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
