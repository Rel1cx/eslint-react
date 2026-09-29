import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export type ComponentUsageFact = {
  name: string;
  node: TSESTree.JSXIdentifier;
};

export type StaticComponentsFacts = {
  componentUsages: ComponentUsageFact[];
};

export function createFactCollector() {
  const facts: StaticComponentsFacts = {
    componentUsages: [],
  };

  const visitor: RuleListener = {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      if (node.name.type !== AST.JSXIdentifier) return;
      const name = node.name.name;
      if (!core.isFunctionComponentName(name)) return;
      facts.componentUsages.push({ name, node: node.name });
    },
  };

  return { facts, visitor } as const;
}
