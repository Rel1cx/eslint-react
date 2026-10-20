import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { createFactCollector } from "./collect";
import { inferCreatedComponents } from "./effects";
import { createRenderBoundaryChecker } from "./helpers";

export const RULE_NAME = "static-components";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "created-here";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that components are static, not recreated every render.",
    },
    messages: {
      default:
        "Cannot create components during render. Components created during render will reset their state each time they are created. Declare components outside of render.",

      // Subordinate error messages reported at the component creation site.
      "created-here": "The component is created during render here.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Detection hints that narrow function-component detection: functions
  // returning non-JSX values (numbers, booleans, null, strings, undefined),
  // functions with one-sided conditional or logical JSX returns, and functions
  // defined as array destructuring pattern elements, in array literals, or in
  // `array.map` callbacks are not components
  const hint = core.FunctionComponentDetectionHint.DoNotIncludeJSXWithNumberValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithBooleanValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithNullValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithStringValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithUndefinedValue
    | core.FunctionComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJSX
    | core.FunctionComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJSX
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  const fc = core.getFunctionComponentCollector(context, { hint });
  const cc = core.getClassComponentCollector(context);
  const { facts, visitor } = createFactCollector();

  return merge(
    fc.visitor,
    cc.visitor,
    visitor,
    {
      "Program:exit"(program) {
        const componentNodes = [
          ...fc.api.getAllComponents(program),
          ...cc.api.getAllComponents(program),
        ].map((component) => component.node);
        const isInsideRender = createRenderBoundaryChecker(componentNodes);

        // Report each dynamic component usage, plus a single subordinate
        // report at the creation site (deduplicated across usages)
        const reportedCreations = new Set<TSESTree.Node>();
        for (const effect of inferCreatedComponents(context, facts.componentUsages, isInsideRender)) {
          context.report({
            messageId: "default",
            node: effect.node,
          });
          if (effect.creationNode == null) continue;
          if (reportedCreations.has(effect.creationNode)) continue;
          reportedCreations.add(effect.creationNode);
          context.report({
            messageId: "created-here",
            node: effect.creationNode,
          });
        }
      },
    },
  );
}
