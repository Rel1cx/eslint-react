import { type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/core";
import { isCallFromPragma } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const isCreateRefCall = isCallFromPragma("createRef");

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `createRef` in function components",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CREATE_REF: "Do not use `createRef.` Use the `useRef` hook instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);
    const possibleCreateRefCalls = new Map<TSESTreeFunction, TSESTree.CallExpression>();

    return {
      ...listeners,
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        if (!isCreateRefCall(node, context, initialScope)) {
          return;
        }

        O.map(ctx.getCurrentFunction(), ([currentFn]) => possibleCreateRefCalls.set(currentFn, node));
      },
      "Program:exit"(node) {
        const components = Array.from(ctx.getAllComponents(node).values());
        for (const [fn, call] of possibleCreateRefCalls.entries()) {
          if (!components.some((component) => component.node === fn)) {
            continue;
          }

          context.report({
            messageId: "NO_CREATE_REF",
            node: call,
          });
        }
      },
    };
  },
});
