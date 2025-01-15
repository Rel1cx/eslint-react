// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import * as AST from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseStateCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// variables should be defined here
const ALLOW_LIST = ["Boolean", "String", "Number"];

// rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow function calls in 'useState' that aren't wrapped in an initializer function",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      preferUseStateLazyInitialization:
        "To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: 'useState(() => getValue())'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("use")) {
      return {};
    }
    const alias = getSettingsFromContext(context).additionalHooks.useState ?? [];
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) {
          return;
        }
        if (!isUseStateCall(node, context) && !alias.some(isReactHookCallWithNameLoose(node))) {
          return;
        }
        const [useStateInput] = node.arguments;
        if (useStateInput == null) {
          return;
        }
        const nestedCallExpressions = AST.getNestedCallExpressions(useStateInput);
        const hasFunctionCall = nestedCallExpressions.some((n) => {
          return "name" in n.callee
            && !ALLOW_LIST.includes(n.callee.name);
        });
        const hasNewCall = AST.getNestedNewExpressions(useStateInput).some((n) => {
          return "name" in n.callee
            && !ALLOW_LIST.includes(n.callee.name);
        });
        if (!hasFunctionCall && !hasNewCall) {
          return;
        }
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: useStateInput,
        });
      },
    };
  },
  defaultOptions: [],
});
