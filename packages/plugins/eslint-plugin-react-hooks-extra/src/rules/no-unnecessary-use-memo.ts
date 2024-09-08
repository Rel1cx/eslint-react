import * as AST from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseMemoCall } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-memo";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unnecessary usage of 'useMemo'",
    },
    messages: {
      noUnnecessaryUseMemo: "An 'useMemo' with empty deps and no references to the component scope may be unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("use")) return {};
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
        if (!AST.isFunction(component)) return;
        const [cb, deps] = node.arguments;
        if (!deps) {
          context.report({
            messageId: "noUnnecessaryUseMemo",
            node,
          });
          return;
        }
        const hasEmptyDeps = F.pipe(
          match(deps)
            .with({ type: AST_NODE_TYPES.ArrayExpression }, O.some)
            .with({ type: AST_NODE_TYPES.Identifier }, n => {
              return F.pipe(
                VAR.findVariable(n.name, initialScope),
                O.flatMap(VAR.getVariableNode(0)),
                O.filter(AST.is(AST_NODE_TYPES.ArrayExpression)),
              );
            })
            .otherwise(O.none),
          O.exists(x => x.elements.length === 0),
        );
        if (!hasEmptyDeps) return;
        if (!cb) {
          context.report({
            messageId: "noUnnecessaryUseMemo",
            node,
          });
          return;
        }
        const isReferencedToComponentScope = F.pipe(
          match(cb)
            .with({ type: AST_NODE_TYPES.ArrowFunctionExpression }, n => {
              if (n.body.type === AST_NODE_TYPES.ArrowFunctionExpression) {
                return O.some(n.body);
              }
              return O.some(n);
            })
            .with({ type: AST_NODE_TYPES.FunctionExpression }, O.some)
            .with({ type: AST_NODE_TYPES.Identifier }, n => {
              return F.pipe(
                VAR.findVariable(n.name, initialScope),
                O.flatMap(VAR.getVariableNode(0)),
                O.filter(AST.isFunction),
              );
            })
            .otherwise(O.none),
          O.map(n => context.sourceCode.getScope(n)),
          O.map(s => [...s.childScopes, s].flatMap(x => x.references)),
          O.exists(refs => refs.some(x => x.resolved?.scope.block === component)),
        );
        if (isReferencedToComponentScope) return;
        context.report({
          messageId: "noUnnecessaryUseMemo",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
