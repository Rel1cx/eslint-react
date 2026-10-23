import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import type { RegExpLike } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

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
};

export function createFactCollector(additionalStateHooks: RegExpLike, additionalEffectHooks: RegExpLike) {
  const facts: SetStateInEffectFacts = {
    calls: [],
    effectRoots: [],
  };
  const functionEntries: TSESTreeFunction[] = [];

  const isUseStateCall = (node: TSESTree.Node): boolean => core.isUseStateLikeCall(node, additionalStateHooks);
  const isUseEffectCall = (node: TSESTree.Node): boolean => core.isUseEffectLikeCall(node, additionalEffectHooks);

  const visitor: RuleListener = {
    ":function"(node: TSESTreeFunction) {
      functionEntries.push(node);
    },
    ":function:exit"() {
      functionEntries.pop();
    },
    CallExpression(node: TSESTree.CallExpression) {
      if (isUseStateCall(node)) return;
      if (isUseEffectCall(node)) {
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
