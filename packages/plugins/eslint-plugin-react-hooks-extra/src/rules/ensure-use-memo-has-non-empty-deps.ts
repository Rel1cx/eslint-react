import { is, NodeType } from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseMemoCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-use-memo-has-non-empty-deps";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce 'useMemo' has non-empty dependencies array",
      requiresTypeChecking: false,
    },
    messages: {
      ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS: "An useMemo should have a non-empty dependencies array",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const alias = getESLintReactSettings(context.settings).additionalHooks?.useMemo ?? [];

    return {
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope(node);
        if (!isReactHookCall(node)) return;
        if (!isUseMemoCall(node, context) && !alias.some(F.flip(isReactHookCallWithNameLoose)(node))) return;
        const [_, deps] = node.arguments;
        if (!deps) {
          context.report({
            messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
            node,
          });
          return;
        }

        const maybeDescriptor = F.pipe(
          match(deps)
            .with({ type: NodeType.ArrayExpression }, O.some)
            .with({ type: NodeType.Identifier }, n => {
              return F.pipe(
                findVariable(n.name, initialScope),
                O.flatMap(getVariableInit(0)),
                O.filter(is(NodeType.ArrayExpression)),
              );
            })
            .otherwise(O.none),
          O.filter(x => x.elements.length === 0),
          O.map(() => ({
            messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
            node,
          } as const)),
        );

        O.map(maybeDescriptor, context.report);
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
