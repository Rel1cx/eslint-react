import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

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
  const hint = core.ComponentDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithNullValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithStringValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.ComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
    | core.ComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  // Collectors to find all component and hook definitions in the code
  const fCollector = core.getComponentCollector(context, { hint });
  const cCollector = core.getComponentCollectorLegacy(context);
  const hCollector = core.getHookCollector(context);

  // Track already-reported nodes to avoid duplicate reports
  const reported = new Set<ast.TSESTreeFunction>();

  return defineRuleListener(
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
          if (ast.findParent(node, ast.isFunction) == null) continue;
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
          if (ast.findParent(node, ast.isFunction) == null) continue;
          context.report({
            data: { name },
            messageId: "component",
            node,
          });
        }

        // Check hooks defined inside any function (not at module level)
        for (const { name, node } of hooks) {
          if (ast.findParent(node, ast.isFunction) == null) continue;
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
