import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export type ComponentUsageFact = {
  /** The root binding name used for scope resolution (`Ns` for `<Ns.Bar />`). */
  name: string;
  /** The tag node the usage is reported at. */
  node: TSESTree.JSXIdentifier | TSESTree.JSXMemberExpression;
  /** The property path after the root (`["Bar"]` for `<Ns.Bar />`); empty for a plain identifier tag. */
  path: string[];
};

export type StaticComponentsFacts = {
  componentUsages: ComponentUsageFact[];
};

/**
 * Create a collector that gathers the JSX usages of components: every
 * component-named JSX opening element and every member expression tag, so that
 * inference can check whether the referenced binding is created during render
 * @returns The collected facts and the visitor that fills them
 */
export function createFactCollector() {
  const facts: StaticComponentsFacts = {
    componentUsages: [],
  };

  const visitor: RuleListener = {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      const tag = node.name;
      // Namespaced names (`<svg:Foo />`) are not simple bindings
      if (tag.type === AST.JSXNamespacedName) return;
      if (tag.type === AST.JSXIdentifier) {
        // Lowercase names are intrinsic elements, not components
        if (!core.isFunctionComponentName(tag.name)) return;
        facts.componentUsages.push({ name: tag.name, path: [], node: tag });
        return;
      }
      // A member expression tag always references a component value — it compiles
      // to a property access, never an intrinsic element — so no component-name
      // gate applies. Flatten the chain into a root binding name plus a property
      // path for origin resolution (ex: `<Ns.Deep.Bar />` -> `Ns`, `["Deep", "Bar"]`).
      const path: string[] = [];
      let root: TSESTree.JSXTagNameExpression = tag;
      while (root.type === AST.JSXMemberExpression) {
        path.unshift(root.property.name);
        root = root.object;
      }
      // A namespaced root (`<svg:Foo.Bar />`) is not a simple binding
      if (root.type !== AST.JSXIdentifier) return;
      facts.componentUsages.push({ name: root.name, path, node: tag });
    },
  };

  return { facts, visitor } as const;
}
