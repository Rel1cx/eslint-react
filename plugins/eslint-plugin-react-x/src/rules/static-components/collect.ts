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

/**
 * Create a collector that gathers the JSX usages of components: every
 * component-named JSX opening element, so that inference can check whether
 * the referenced binding is created during render
 * @returns The collected facts and the visitor that fills them
 */
export function createFactCollector() {
  const facts: StaticComponentsFacts = {
    componentUsages: [],
  };

  const visitor: RuleListener = {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      // Member expressions (`<Foo.Bar>`) and namespaced names are not simple bindings
      if (node.name.type !== AST.JSXIdentifier) return;
      const name = node.name.name;
      // Lowercase names are intrinsic elements, not components
      if (!core.isFunctionComponentName(name)) return;
      facts.componentUsages.push({ name, node: node.name });
    },
  };

  return { facts, visitor } as const;
}
