import { Check, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { isHigherOrderComponent, isTestMockCallback } from "./lib";

import { createRule } from "../../utils";

export const RULE_NAME = "component-hook-factories";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "component"
  | "hook";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows higher order functions that define components or hooks inside them.",
    },
    messages: {
      component:
        "Do not define component '{{name}}' inside a function. Components should be defined at the module level. Move it to the top level.",
      hook:
        "Do not define hook '{{name}}' inside a function. Hooks should be defined at the module level. Move it to the top level.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Configuration hints to optimize component detection accuracy and performance
  const hint = core.FunctionComponentDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithNullValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithStringValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.FunctionComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
    | core.FunctionComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  // Collectors to find all component and hook definitions in the code
  const fCollector = core.getFunctionComponentCollector(context, { hint });
  const cCollector = core.getClassComponentCollector(context);
  const hCollector = core.getHookCollector(context);

  // Track already-reported nodes to avoid duplicate reports
  const reported = new Set<TSESTreeFunction>();

  return merge(
    fCollector.visitor,
    cCollector.visitor,
    hCollector.visitor,
    {
      "Program:exit"(program) {
        // Gather all function components, class components, and hooks
        const fComponents = [...fCollector.api.getAllComponents(program)];
        const cComponents = [...cCollector.api.getAllComponents(program)];
        const hooks = [...hCollector.api.getAllHooks(program)];

        // Check function components defined inside any function (not at module level)
        for (const { name, node } of fComponents) {
          if (name == null) continue;
          const parentFn = Traverse.findParent(node, Check.isFunction);
          if (parentFn == null) continue;
          // Skip components inside test mock callbacks (vi.mock / jest.mock)
          if (Traverse.findParent(node, isTestMockCallback) != null) continue;
          // Skip components inside HOC definitions (functions that take a component as parameter)
          if (isHigherOrderComponent(parentFn as TSESTreeFunction)) continue;
          if (reported.has(node)) continue;
          context.report({
            data: { name },
            messageId: "component",
            node,
          });
          reported.add(node);
        }

        // Check class components defined inside any function (not at module level)
        for (const { name = "unknown", node } of cComponents) {
          const parentFn = Traverse.findParent(node, Check.isFunction);
          if (parentFn == null) continue;
          // Skip components inside test mock callbacks (vi.mock / jest.mock)
          if (Traverse.findParent(node, isTestMockCallback) != null) continue;
          // Skip components inside HOC definitions
          if (isHigherOrderComponent(parentFn as TSESTreeFunction)) continue;
          context.report({
            data: { name },
            messageId: "component",
            node,
          });
        }

        // Check hooks defined inside any function (not at module level)
        for (const { name, node } of hooks) {
          const parentFn = Traverse.findParent(node, Check.isFunction);
          if (parentFn == null) continue;
          // Skip hooks inside test mock callbacks (vi.mock / jest.mock)
          if (Traverse.findParent(node, isTestMockCallback) != null) continue;
          if (reported.has(node)) continue;
          context.report({
            data: { name },
            messageId: "hook",
            node,
          });
          reported.add(node);
        }
      },
    },
  );
}
