import * as AST from "@eslint-react/ast";
import {
  ComponentDetectionHint,
  isCreateContextCall,
  isCreateElementCall,
  isLazyCall,
  isReactHookCall,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-lazy-component-declarations";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow nesting lazy component declarations inside other components.",
    },
    messages: {
      noNestedLazyComponentDeclarations:
        "Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hint = ComponentDetectionHint.None;
  // Collector for function components
  const collector = useComponentCollector(context, { hint });
  // Collector for class components
  const collectorLegacy = useComponentCollectorLegacy();

  // A set to store all `React.lazy()` call expressions
  const lazyComponentDeclarations = new Set<TSESTree.CallExpression>();

  return {
    ...collector.listeners,
    ...collectorLegacy.listeners,
    // Find all `React.lazy()` calls with dynamic imports and store them
    ImportExpression(node) {
      const lazyCall = AST.findParentNode(node, (n) => isLazyCall(context, n));
      if (lazyCall != null) {
        lazyComponentDeclarations.add(lazyCall);
      }
    },
    // After traversing the whole program, check if any lazy component is nested
    "Program:exit"(program) {
      // Get all collected function and class components
      const functionComponents = collector
        .ctx
        .getAllComponents(program);

      const classComponents = collectorLegacy
        .ctx
        .getAllComponents(program);

      // Iterate over each found `React.lazy()` call
      for (const lazy of lazyComponentDeclarations) {
        // Check if the lazy declaration is inside a component, hook, or JSX
        const significantParent = AST.findParentNode(lazy, (n) => {
          if (AST.isJSX(n)) return true;
          if (n.type === T.CallExpression) {
            // Check for React hooks, `createElement`, or `createContext`
            return isReactHookCall(n) || isCreateElementCall(context, n) || isCreateContextCall(context, n);
          }
          if (AST.isFunction(n)) {
            // Check if it's inside a function component
            return functionComponents.some((c) => c.node === n);
          }
          if (AST.isClass(n)) {
            // Check if it's inside a class component
            return classComponents.some((c) => c.node === n);
          }
          return false;
        });
        // If a significant parent is found, it's a nested lazy declaration, so report an error
        if (significantParent != null) {
          context.report({
            messageId: "noNestedLazyComponentDeclarations",
            node: lazy,
          });
        }
      }
    },
  };
}
