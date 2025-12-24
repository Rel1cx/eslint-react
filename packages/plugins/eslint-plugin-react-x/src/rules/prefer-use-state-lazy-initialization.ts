// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import * as AST from "@eslint-react/ast";
import { isReactHookName, isUseCall, isUseStateCall } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// Allow primitive wrapper types, as they are not expensive
const ALLOW_LIST = [
  "Boolean",
  "String",
  "Number",
];

// This rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces function calls made inside 'useState' to be wrapped in an 'initializer function'.",
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
  return {
    CallExpression(node) {
      // Check if the function call is `useState`
      if (!isUseStateCall(node)) {
        return;
      }
      // Get the first argument of `useState`
      const [useStateInput] = node.arguments;
      if (useStateInput == null) {
        return;
      }
      // Check for `new` expressions, e.g., `new MyClass()`
      for (const expr of AST.getNestedNewExpressions(useStateInput)) {
        if (!("name" in expr.callee)) continue;
        // Ignore primitive wrappers like `new String('foo')`
        if (ALLOW_LIST.includes(expr.callee.name)) continue;
        // Ignore if it's inside a `use()` call
        if (AST.findParentNode(expr, isUseCall) != null) continue;
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: expr,
        });
      }
      // Check for function call expressions, e.g., `myFunction()`
      for (const expr of AST.getNestedCallExpressions(useStateInput)) {
        if (!("name" in expr.callee)) continue;
        // Ignore other React hooks
        if (isReactHookName(expr.callee.name)) continue;
        // Ignore primitive wrappers like `String('foo')`
        if (ALLOW_LIST.includes(expr.callee.name)) continue;
        // Ignore if it's inside a `use()` call
        if (AST.findParentNode(expr, isUseCall) != null) continue;
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: expr,
        });
      }
    },
  };
}
