import type { TSESTreeFunction } from "@eslint-react/ast";
import { isCreateRefCall, useComponentCollector } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'createRef' in function components",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_CREATE_REF: "A 'createRef' is not allowed in function components. Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const possibleCreateRefCalls = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();

    return {
      ...listeners,
      CallExpression(node) {
        if (!isCreateRefCall(node, context)) return;
        O.map(
          ctx.getCurrentFunction(),
          ([currentFn]) =>
            possibleCreateRefCalls.set(currentFn, [...possibleCreateRefCalls.get(currentFn) ?? [], node]),
        );
      },
      "Program:exit"(node) {
        const components = Array.from(ctx.getAllComponents(node).values());
        for (const { node: component } of components) {
          const createRefCalls = possibleCreateRefCalls.get(component);
          if (!createRefCalls) continue;
          for (const createRefCall of createRefCalls) {
            context.report({
              messageId: "NO_CREATE_REF",
              node: createRefCall,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
