import { type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/core";
import { isCallFromPragma } from "@eslint-react/jsx";
import { E, F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

type MessageID = ConstantCase<typeof RULE_NAME>;

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
        if (!isCreateRefCall(node, context)) {
          return;
        }

        F.pipe(
          ctx.getCurrentFunction(),
          O.map((currentFn) => possibleCreateRefCalls.set(currentFn, node)),
          E.fromOption(() => "Unexpected empty function stack"),
          E.mapLeft(console.warn),
        );
      },
      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          console.error(maybeComponents.left);

          return;
        }

        const components = maybeComponents.right;
        for (const [fn, call] of possibleCreateRefCalls.entries()) {
          if (!components.includes(fn)) {
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
