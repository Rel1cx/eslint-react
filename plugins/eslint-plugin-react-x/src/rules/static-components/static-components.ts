import { createRule } from "@/utils/create-rule";
import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariableForIdentifier, getDynamicComponentSource } from "./lib";

export const RULE_NAME = "static-components";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "createdHere";

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
      createdHere: "The component is created during render here.",
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

  const candidates: JsxComponentCandidate[] = [];

  return merge(
    fc.visitor,
    cc.visitor,
    {
      JSXOpeningElement(node) {
        if (node.name.type !== AST.JSXIdentifier) return;
        const name = node.name.name;
        if (!core.isFunctionComponentName(name)) return;
        candidates.push({ name, identifier: node.name });
      },
      "Program:exit"(program) {
        const isInsideRender = createRenderBoundaryChecker(fc, cc, program);
        for (const candidate of candidates) {
          reportIfCreatedDuringRender(context, candidate, isInsideRender);
        }
      },
    },
  );
}

interface JsxComponentCandidate {
  name: string;
  identifier: TSESTree.JSXIdentifier;
}

/**
 * Builds a predicate that tells whether a given node lies within the body of a
 * previously-collected function or class component, i.e. whether it is "created during render".
 */
function createRenderBoundaryChecker(
  fc: ReturnType<typeof core.getFunctionComponentCollector>,
  cc: ReturnType<typeof core.getClassComponentCollector>,
  program: TSESTree.Program,
) {
  const componentNodes = new Set([
    ...fc.api.getAllComponents(program),
    ...cc.api.getAllComponents(program),
  ].map((component) => component.node));

  const getEnclosingComponent = (node: TSESTree.Node) => Traverse.findParent(node, (n) => (Check.isFunction(n) || Check.isClass(n)) && componentNodes.has(n));

  return (node: TSESTree.Node) => getEnclosingComponent(node) != null;
}

function reportIfCreatedDuringRender(
  context: RuleContext<MessageID, []>,
  candidate: JsxComponentCandidate,
  isInsideRender: (node: TSESTree.Node) => boolean,
) {
  const { name, identifier } = candidate;

  const variable = findVariableForIdentifier(context, identifier);
  if (variable == null) return;

  const def = variable.defs.at(0);
  if (def == null) return;

  // The declaration of the component's value must itself live inside a component's render body
  // for it to be a candidate for "created during render".
  if (!isInsideRender(def.node)) return;

  const { creationNode, isDynamic } = getDynamicComponentSource(context, variable, isInsideRender);
  if (!isDynamic) return;

  context.report({
    data: { name },
    messageId: "default",
    node: identifier,
  });

  if (creationNode != null) {
    context.report({
      data: { name },
      messageId: "createdHere",
      node: creationNode,
    });
  }
}
