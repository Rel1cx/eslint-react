import { findVariableByNameUpToGlobal, getVariableInit, is, NodeType } from "@eslint-react/ast";
import { isReactHookCall, isUseMemoCall } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-use-memo-has-non-empty-deps";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce `useMemo` has non-empty dependencies array",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS: "`useMemo` should have a non-empty dependencies array",
    },
  },
  defaultOptions: [],
  create(context) {
    const pragma = getPragmaFromContext(context);

    return {
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

        if (!isReactHookCall(node) || !isUseMemoCall(node, context, pragma)) {
          return;
        }

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
                findVariableByNameUpToGlobal(n.name, initialScope),
                O.flatMap(getVariableInit(0)),
                O.filter(is(NodeType.ArrayExpression)),
              );
            })
            .otherwise(O.none),
          O.filter(x => x.elements.length === 0),
          O.map(() => ({
            node,
            messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
          } as const)),
        );

        O.map(maybeDescriptor, context.report);
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
