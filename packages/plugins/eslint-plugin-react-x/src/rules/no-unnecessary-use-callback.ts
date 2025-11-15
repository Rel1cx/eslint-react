import * as AST from "@eslint-react/ast";
import { isUseCallbackCall, isUseEffectLikeCall } from "@eslint-react/core";
import { identity } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findVariable, getChildScopes, getVariableDefinitionNode } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import { type RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";
import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-callback";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | "noUnnecessaryUseCallbackInsideUseEffect";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow unnecessary usage of `useCallback`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUseCallback:
        "An 'useCallback' with empty deps and no references to the component scope may be unnecessary.",
      noUnnecessaryUseCallbackInsideUseEffect: "{{name}} is only used inside 1 useEffect which may be unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useCallback` is not present in the file
  if (!context.sourceCode.text.includes("useCallback")) return {};

  return {
    CallExpression(node) {
      if (!isUseCallbackCall(node)) {
        return;
      }

      const initialScope = context.sourceCode.getScope(node);
      const component = context.sourceCode.getScope(node).block;

      if (!AST.isFunction(component)) {
        return;
      }
      const [arg0, arg1] = node.arguments;
      if (arg0 == null || arg1 == null) {
        return;
      }

      const hasEmptyDeps = match(arg1)
        .with({ type: T.ArrayExpression }, (n) => n.elements.length === 0)
        .with({ type: T.Identifier }, (n) => {
          const variable = findVariable(n.name, initialScope);
          const variableNode = getVariableDefinitionNode(variable, 0);
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
          const variable = findVariable(n.name, initialScope);
          const variableNode = getVariableDefinitionNode(variable, 0);
          if (variableNode?.type !== T.ArrowFunctionExpression && variableNode?.type !== T.FunctionExpression) {
            return null;
          }
          return variableNode;
        })
        .otherwise(() => null);
      if (arg0Node == null) return;

      const arg0NodeScope = context.sourceCode.getScope(arg0Node);
      const arg0NodeReferences = getChildScopes(arg0NodeScope).flatMap((x) => x.references);
      const isReferencedToComponentScope = arg0NodeReferences.some((x) => x.resolved?.scope.block === component);

      if (!isReferencedToComponentScope) {
        context.report({
          messageId: "noUnnecessaryUseCallback",
          node,
        });
      }
    },
    VariableDeclarator(node) {
      if (!context.sourceCode.text.includes("useEffect")) {
        return;
      }

      if (!isUseCallbackCall(node.init ?? undefined)) {
        return;
      }

      if (!isIdentifier(node.id)) {
        return;
      }

      const references = context.sourceCode.getDeclaredVariables(node)[0]?.references ?? [];
      const usages = references.filter((ref) => !(ref.init ?? false));
      const effectSet = new Set<TSESTree.Node>();

      for (const usage of usages) {
        const effect = AST.findParentNode(usage.identifier, (node) => isUseEffectLikeCall(node));

        if (effect == null) {
          return;
        }

        effectSet.add(effect);
        if (effectSet.size > 1) {
          return;
        }
      }
      context.report({
        messageId: "noUnnecessaryUseCallbackInsideUseEffect",
        node,
        data: { name: node.id.name },
      });
    },
  };
}
