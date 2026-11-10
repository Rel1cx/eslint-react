import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import type { RegExpLike } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export type EffectRootFact = {
  node: TSESTree.CallExpression;
  setup: TSESTree.CallExpressionArgument;
};

export type CallFact = {
  enclosingFunction: TSESTreeFunction;
  node: TSESTree.CallExpression;
};

export type SetStateInEffectFacts = {
  calls: CallFact[];
  effectRoots: EffectRootFact[];
  jsxRefExprs: TSESTree.Node[];
};

export function createFactCollector(additionalHooks: [state: RegExpLike, effect: RegExpLike]) {
  const [stateHooks, effectHooks] = additionalHooks;
  const facts: SetStateInEffectFacts = {
    calls: [],
    effectRoots: [],
    jsxRefExprs: [],
  };
  const functionEntries: TSESTreeFunction[] = [];
  const visitor: RuleListener = {
    ":function"(node: TSESTreeFunction) {
      functionEntries.push(node);
    },
    ":function:exit"() {
      functionEntries.pop();
    },
    JSXAttribute(node: TSESTree.JSXAttribute) {
      if (node.name.type !== AST.JSXIdentifier || node.name.name !== "ref") return;
      if (node.value?.type !== AST.JSXExpressionContainer) return;
      facts.jsxRefExprs.push(node.value.expression);
    },
    CallExpression(node: TSESTree.CallExpression) {
      if (core.isUseStateLikeCall(node, stateHooks)) return;
      if (core.isUseEffectLikeCall(node, effectHooks)) {
        const setup = node.arguments.at(0);
        if (setup != null) {
          facts.effectRoots.push({ node, setup });
        }
        return;
      }
      const enclosingFunction = functionEntries.at(-1);
      if (enclosingFunction == null) return;
      facts.calls.push({ enclosingFunction, node });
    },
  };

  return { facts, visitor } as const;
}
