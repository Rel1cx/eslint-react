import { is, isFunction, NodeType } from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseMemoCall } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-use-memo-has-non-empty-deps";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce 'useMemo' has non-empty dependencies array",
    },
    messages: {
      ensureUseMemoHasNonEmptyDeps: "An 'useMemo' should have a non-empty dependencies array.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const alias = decodeSettings(context.settings).additionalHooks?.useMemo ?? [];

    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) return;
        const initialScope = context.sourceCode.getScope(node);
        if (!isUseMemoCall(node, context) && !alias.some(isReactHookCallWithNameLoose(node))) {
          return;
        }
        const scope = context.sourceCode.getScope(node);
        const component = scope.block;
        if (!isFunction(component)) return;
        const [cb, deps] = node.arguments;
        if (!deps) {
          context.report({
            messageId: "ensureUseMemoHasNonEmptyDeps",
            node,
          });
          return;
        }
        const hasEmptyDeps = F.pipe(
          match(deps)
            .with({ type: NodeType.ArrayExpression }, O.some)
            .with({ type: NodeType.Identifier }, n => {
              return F.pipe(
                findVariable(n.name, initialScope),
                O.flatMap(getVariableNode(0)),
                O.filter(is(NodeType.ArrayExpression)),
              );
            })
            .otherwise(O.none),
          O.exists(x => x.elements.length === 0),
        );
        if (!hasEmptyDeps) return;
        if (!cb) {
          context.report({
            messageId: "ensureUseMemoHasNonEmptyDeps",
            node,
          });
          return;
        }
        const isReferencedToComponentScope = F.pipe(
          match(cb)
            .with({ type: NodeType.ArrowFunctionExpression }, n => {
              if (n.body.type === NodeType.ArrowFunctionExpression) {
                return O.some(n.body);
              }
              return O.some(n);
            })
            .with({ type: NodeType.FunctionExpression }, O.some)
            .with({ type: NodeType.Identifier }, n => {
              return F.pipe(
                findVariable(n.name, initialScope),
                O.flatMap(getVariableNode(0)),
                O.filter(isFunction),
              );
            })
            .otherwise(O.none),
          O.map(n => context.sourceCode.getScope(n)),
          O.map(s => [...s.childScopes, s].flatMap(x => x.references)),
          O.exists(refs => refs.some(x => x.resolved?.scope.block === component)),
        );
        if (isReferencedToComponentScope) return;
        context.report({
          messageId: "ensureUseMemoHasNonEmptyDeps",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
