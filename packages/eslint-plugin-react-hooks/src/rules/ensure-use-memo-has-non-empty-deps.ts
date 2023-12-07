import { findVariableByNameUpToGlobal, getVariableInit, is, NodeType } from "@eslint-react/ast";
import { isUseMemoCall, unsafeIsReactHookCall } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { F, M, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type ConstantCase } from "string-ts";

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

        if (!unsafeIsReactHookCall(node) || !isUseMemoCall(node, context, pragma)) {
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

        const depsArray = M.match(deps)
          .with({ type: NodeType.ArrayExpression }, O.some)
          .with({ type: NodeType.Identifier }, n => {
            return F.pipe(
              findVariableByNameUpToGlobal(n.name, initialScope),
              O.flatMap(getVariableInit(0)),
              O.filter(is(NodeType.ArrayExpression)),
            );
          })
          .otherwise(O.none);

        const hasEmptyDepsArray = F.pipe(
          depsArray,
          O.exists(x => x.elements.length === 0),
        );

        if (!hasEmptyDepsArray) {
          return;
        }

        context.report({
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
          node,
        });
      },
    };
  },
});
