// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3579/commits/ebb739a0fe99a2ee77055870bfda9f67a2691374
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { getSettingsFromContext } from "@eslint-react/shared";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-use-state-lazy-initialization";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// identifier names for allowed function names
const ALLOW_LIST = [
  "Boolean",
  "String",
  "Number",
];

// rule takes inspiration from https://github.com/facebook/react/issues/26520
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: {
      deprecatedSince: "2.0.0",
      replacedBy: [
        {
          message: "Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.",
          plugin: {
            name: "eslint-plugin-react-x",
            url: "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x",
          },
          rule: {
            name: "prefer-use-state-lazy-initialization",
            url: "https://eslint-react.xyz/docs/rules/prefer-use-state-lazy-initialization",
          },
        },
        {
          message: "Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.",
          plugin: {
            name: "@eslint-react/eslint-plugin",
            url: "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin",
          },
          rule: {
            name: "prefer-use-state-lazy-initialization",
            url: "https://eslint-react.xyz/docs/rules/prefer-use-state-lazy-initialization",
          },
        },
      ],
    },
    docs: {
      description: "Enforces function calls made inside `useState` to be wrapped in an `initializer function`.",
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
  const alias = getSettingsFromContext(context).additionalHooks.useState ?? [];
  const isUseStateCall = ER.isReactHookCallWithNameAlias(context, "useState", alias);
  return {
    CallExpression(node) {
      if (!ER.isReactHookCall(node)) {
        return;
      }
      if (!isUseStateCall(node)) {
        return;
      }
      const [useStateInput] = node.arguments;
      if (useStateInput == null) {
        return;
      }
      for (const expr of AST.getNestedNewExpressions(useStateInput)) {
        if (!("name" in expr.callee)) continue;
        if (ALLOW_LIST.includes(expr.callee.name)) continue;
        if (AST.findParentNode(expr, (n) => ER.isUseCall(context, n)) != null) continue;
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: expr,
        });
      }
      for (const expr of AST.getNestedCallExpressions(useStateInput)) {
        if (!("name" in expr.callee)) continue;
        if (ER.isReactHookName(expr.callee.name)) continue;
        if (ALLOW_LIST.includes(expr.callee.name)) continue;
        if (AST.findParentNode(expr, (n) => ER.isUseCall(context, n)) != null) continue;
        context.report({
          messageId: "preferUseStateLazyInitialization",
          node: expr,
        });
      }
    },
  };
}
