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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
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

  const fc = core.getFunctionComponentCollector(context, { hint });
  const cc = core.getClassComponentCollector(context);
  const facts = createFactCollector();

  return merge(
    fc.visitor,
    cc.visitor,
    facts.visitor,
    {
      "Program:exit"(program) {
        const componentNodes = [
          ...fc.api.getAllComponents(program),
          ...cc.api.getAllComponents(program),
        ].map((component) => component.node);
        const isInsideRender = createRenderBoundaryChecker(componentNodes);

        const reportedCreations = new Set<TSESTree.Node>();
        for (const effect of inferCreatedComponents(context, facts.facts.componentUsages, isInsideRender)) {
          context.report({
            data: { name: effect.name },
            messageId: "default",
            node: effect.node,
          });
          if (effect.creationNode != null && !reportedCreations.has(effect.creationNode)) {
            reportedCreations.add(effect.creationNode);
            context.report({
              data: { name: effect.name },
              messageId: "created-here",
              node: effect.creationNode,
            });
          }
        }
      },
    },
  );
}
