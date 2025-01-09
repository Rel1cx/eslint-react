import * as AST from "@eslint-react/ast";
import { isReactHookCall, isReactHookCallWithNameLoose, isUseMemoCall } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-memo";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unnecessary usage of 'useMemo'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUseMemo: "An 'useMemo' with empty deps and no references to the component scope may be unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("use")) {
      return {};
    }
    const alias = getSettingsFromContext(context).additionalHooks?.useMemo ?? [];
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) {
          return;
        }
        const initialScope = context.sourceCode.getScope(node);
        if (!isUseMemoCall(node, context) && !alias.some(isReactHookCallWithNameLoose(node))) {
          return;
        }
        const scope = context.sourceCode.getScope(node);
        const component = scope.block;
        if (!AST.isFunction(component)) {
          return;
        }
        const [arg0, arg1] = node.arguments;
        if (arg0 == null || arg1 == null) {
          return;
        }
        const hasCallInArg0 = F.pipe(
          O.some(arg0),
          O.filter(n => AST.isFunction(n)),
          O.exists(n => [...AST.getNestedCallExpressions(n.body), ...AST.getNestedNewExpressions(n.body)].length > 0),
        );
        if (hasCallInArg0) {
          return;
        }
        const hasEmptyDeps = F.pipe(
          match(arg1)
            .with({ type: T.ArrayExpression }, O.some)
            .with({ type: T.Identifier }, n => {
              return F.pipe(
                VAR.findVariable(n.name, initialScope),
                O.flatMap(VAR.getVariableNode(0)),
                O.filter(AST.is(T.ArrayExpression)),
              );
            })
            .otherwise(O.none),
          O.exists(x => x.elements.length === 0),
        );
        if (!hasEmptyDeps) {
          return;
        }
        const isReferencedToComponentScope = F.pipe(
          match(arg0)
            .with({ type: T.ArrowFunctionExpression }, n => {
              if (n.body.type === T.ArrowFunctionExpression) {
                return O.some(n.body);
              }
              return O.some(n);
            })
            .with({ type: T.FunctionExpression }, O.some)
            .with({ type: T.Identifier }, n => {
              return F.pipe(
                VAR.findVariable(n.name, initialScope),
                O.flatMap(VAR.getVariableNode(0)),
                O.filter(AST.isFunction),
              );
            })
            .otherwise(O.none),
          O.map(n => context.sourceCode.getScope(n)),
          O.map(s => VAR.getChidScopes(s).flatMap(x => x.references)),
          O.exists(refs => refs.some(x => x.resolved?.scope.block === component)),
        );
        if (!isReferencedToComponentScope) {
          context.report({
            messageId: "noUnnecessaryUseMemo",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
