// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import * as AST from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isReactHookName, isUseStateCall } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// identifier names for allowed function names
const ALLOW_LIST = [
  "Boolean",
  "String",
  "Number",
];

function isAllowedName(name: string): boolean {
  return ALLOW_LIST.includes(name) || isReactHookName(name);
}

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
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("use")) return {};
  const alias = getSettingsFromContext(context).additionalHooks.useState ?? [];
  return {
    CallExpression(node) {
      if (!isReactHookCall(node)) {
        return;
      }
      if (!isUseStateCall(context, node) && !alias.some(isReactHookCallWithNameLoose(node))) {
        return;
      }
      const [useStateInput] = node.arguments;
      if (useStateInput == null) {
        return;
      }
      const nestedCallExpressions = AST.getNestedCallExpressions(useStateInput);
      const hasFunctionCall = nestedCallExpressions.some((n) => {
        return "name" in n.callee
          && !isAllowedName(n.callee.name);
      });
      const hasNewCall = AST.getNestedNewExpressions(useStateInput).some((n) => {
        return "name" in n.callee
          && !isAllowedName(n.callee.name);
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
}
