import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { createRule } from "../../utils";

export const RULE_NAME = "no-nested-lazy-component-declarations";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows nesting lazy component declarations inside other components.",
    },
    messages: {
      default:
        "Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hint = core.ComponentDetectionHint.None;
  // Collector for function components
  const collector = core.useComponentCollector(context, { hint });
  // Collector for class components
  const collectorLegacy = core.useComponentCollectorLegacy(context);

  // A set to store all `React.lazy()` call expressions
  const lazyComponentDeclarations = new Set<TSESTree.CallExpression>();

  return defineRuleListener(
    collector.visitor,
    collectorLegacy.visitor,
    {
      // Find all `React.lazy()` calls with dynamic imports and store them
      ImportExpression(node) {
        const lazyCall = ast.findParentNode(node, (n) => core.isLazyCall(context, n));
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
          const significantParent = ast.findParentNode(lazy, (n) => {
            if (ast.isJSX(n)) return true;
            if (n.type === AST.CallExpression) {
              // Check for React hooks, `createElement`, or `createContext`
              return core.isHookCall(n) || core.isCreateElementCall(context, n) || core.isCreateContextCall(context, n);
            }
            if (ast.isFunction(n)) {
              // Check if it's inside a function component
              return functionComponents.some((c) => c.node === n);
            }
            if (ast.isClass(n)) {
              // Check if it's inside a class component
              return classComponents.some((c) => c.node === n);
            }
            return false;
          });
          // If a significant parent is found, it's a nested lazy declaration, so report an error
          if (significantParent != null) {
            context.report({
              messageId: "default",
              node: lazy,
            });
          }
        }
      },
    },
  );
}
