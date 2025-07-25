import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { identity } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-memo";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

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
            name: "no-unnecessary-use-memo",
            url: "https://eslint-react.xyz/docs/rules/no-unnecessary-use-memo",
          },
        },
        {
          message: "Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.",
          plugin: {
            name: "@eslint-react/eslint-plugin",
            url: "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin",
          },
          rule: {
            name: "no-unnecessary-use-memo",
            url: "https://eslint-react.xyz/docs/rules/no-unnecessary-use-memo",
          },
        },
      ],
    },
    docs: {
      description: "Disallow unnecessary usage of `useMemo`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUseMemo: "An 'useMemo' with empty deps and no references to the component scope may be unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("use")) return {};
  const alias = getSettingsFromContext(context).additionalHooks.useMemo ?? [];
  const isUseMemoCall = ER.isReactHookCallWithNameAlias(context, "useMemo", alias);
  return {
    CallExpression(node) {
      if (!ER.isReactHookCall(node)) {
        return;
      }
      const initialScope = context.sourceCode.getScope(node);
      if (!isUseMemoCall(node)) {
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
      const hasCallInArg0 = AST.isFunction(arg0)
        && [...AST.getNestedCallExpressions(arg0.body), ...AST.getNestedNewExpressions(arg0.body)].length > 0;

      if (hasCallInArg0) {
        return;
      }

      const hasEmptyDeps = match(arg1)
        .with({ type: T.ArrayExpression }, (n) => n.elements.length === 0)
        .with({ type: T.Identifier }, (n) => {
          const variable = VAR.findVariable(n.name, initialScope);
          const variableNode = VAR.getVariableInitNode(variable, 0);
          if (variableNode?.type !== T.ArrayExpression) {
            return false;
          }
          return variableNode.elements.length === 0;
        })
        .otherwise(() => false);

      if (!hasEmptyDeps) {
        return;
      }
      const arg0Node = match(arg0)
        .with({ type: T.ArrowFunctionExpression }, (n) => {
          if (n.body.type === T.ArrowFunctionExpression) {
            return n.body;
          }
          return n;
        })
        .with({ type: T.FunctionExpression }, identity)
        .with({ type: T.Identifier }, (n) => {
          const variable = VAR.findVariable(n.name, initialScope);
          const variableNode = VAR.getVariableInitNode(variable, 0);
          if (variableNode?.type !== T.ArrowFunctionExpression && variableNode?.type !== T.FunctionExpression) {
            return null;
          }
          return variableNode;
        })
        .otherwise(() => null);
      if (arg0Node == null) return;

      const arg0NodeScope = context.sourceCode.getScope(arg0Node);
      const arg0NodeReferences = VAR.getChidScopes(arg0NodeScope).flatMap((x) => x.references);
      const isReferencedToComponentScope = arg0NodeReferences.some((x) => x.resolved?.scope.block === component);

      if (!isReferencedToComponentScope) {
        context.report({
          messageId: "noUnnecessaryUseMemo",
          node,
        });
      }
    },
  };
}
