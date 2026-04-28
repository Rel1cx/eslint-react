import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule } from "@/utils/create-rule";
import { findVariableForIdentifier, getDynamicComponentSource } from "./lib";

export const RULE_NAME = "static-components";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default" | "createdHere";

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

export function create(context: RuleContext<MessageID, []>) {
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

  const jsxCandidates: Array<{ name: string; node: TSESTree.JSXOpeningElement }> = [];

  return merge(
    fc.visitor,
    cc.visitor,
    {
      JSXOpeningElement(node) {
        if (node.name.type !== AST.JSXIdentifier) return;
        const name = node.name.name;
        if (!core.isFunctionComponentName(name)) return;
        jsxCandidates.push({ name, node });
      },
      "Program:exit"(program) {
        const fComponents = [...fc.api.getAllComponents(program)];
        const cComponents = [...cc.api.getAllComponents(program)];

        function getEnclosingComponent(node: TSESTree.Node) {
          return Traverse.findParent(node, (n) => {
            if (Check.isFunction(n)) return fComponents.some((c) => c.node === n);
            if (Check.isClass(n)) return cComponents.some((c) => c.node === n);
            return false;
          });
        }

        const isInsideRender = (node: TSESTree.Node) => getEnclosingComponent(node) != null;

        for (const { name, node: jsxNode } of jsxCandidates) {
          const jsxName = jsxNode.name as TSESTree.JSXIdentifier;
          const variable = findVariableForIdentifier(context, jsxName);
          if (variable == null || variable.defs.length === 0) continue;

          const def = variable.defs.at(0);
          if (def == null) continue;
          const defNode = def.node;

          const enclosing = getEnclosingComponent(defNode);
          if (enclosing == null) continue;

          const result = getDynamicComponentSource(context, variable, isInsideRender);
          if (!result.isDynamic) continue;

          context.report({
            data: { name },
            messageId: "default",
            node: jsxNode.name,
          });

          if (result.creationNode != null) {
            context.report({
              data: { name },
              messageId: "createdHere",
              node: result.creationNode,
            });
          }
        }
      },
    },
  );
}
