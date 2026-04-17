import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";
import { isInsideCreateElementProps, isInsideJSXAttributeValue, isInsideRenderMethod } from "./lib";

export const RULE_NAME = "no-nested-component-definitions";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows nesting component definitions inside other components.",
    },
    messages: {
      default: "Do not nest component definitions inside other components or props. {{suggestion}}",
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

  // Collectors to find all component definitions in the code
  const fc = core.getFunctionComponentCollector(context, { hint });
  const cc = core.getClassComponentCollector(context);

  return merge(
    fc.visitor,
    cc.visitor,
    {
      "Program:exit"(program) {
        // Gather all function and class components found by the collectors
        const fComponents = [...fc.api.getAllComponents(program)];
        const cComponents = [...cc.api.getAllComponents(program)];
        // Helper to find the enclosing component of a node
        function findEnclosingComponent(node: TSESTree.Node) {
          return Traverse.findParent(node, (n) => {
            if (Check.isFunction(n)) return fComponents.some((c) => c.node === n);
            if (Check.isClass(n)) return cComponents.some((c) => c.node === n);
            return false;
          });
        }
        // Iterate over function components to find nested definitions
        for (const { name, node: component } of fComponents) {
          // Skip anonymous function components to reduce false positives
          if (name == null) continue;
          // Skip components that are directly returned from a render prop
          // if (core.isDirectValueOfRenderPropertyLoose(component)) continue;
          // Check if the component is defined inside a JSX attribute's value
          if (isInsideJSXAttributeValue(component)) {
            // Allow if it's part of a render prop pattern
            // if (!core.isDeclaredInRenderPropLoose(component)) {
            context.report({
              data: {
                name,
                suggestion: "Move it to the top level or pass it as a prop.",
              },
              messageId: "default",
              node: component,
            });
            // }

            continue;
          }
          // Check if the component is defined inside the props of a `createElement` call
          if (isInsideCreateElementProps(context, component)) {
            context.report({
              data: {
                name,
                suggestion: "Move it to the top level or pass it as a prop.",
              },
              messageId: "default",
              node: component,
            });

            continue;
          }
          // Check for direct nesting inside another function component
          if (findEnclosingComponent(component) != null) {
            context.report({
              data: {
                name,
                suggestion: component.parent.type === AST.Property
                  ? "Move it to the top level or pass it as a prop."
                  : "Move it to the top level.",
              },
              messageId: "default",
              node: component,
            });

            continue;
          }
          // Check if the component is defined inside a class component's render method
          if (isInsideRenderMethod(component)) {
            context.report({
              data: {
                name,
                suggestion: "Move it to the top level.",
              },
              messageId: "default",
              node: component,
            });
          }
        }
        // Iterate over class components to find nested definitions
        for (const { name = "unknown", node: component } of cComponents) {
          // Find if the parent is another component
          if (findEnclosingComponent(component) == null) continue;
          context.report({
            data: {
              name,
              suggestion: component.parent.type === AST.Property
                ? "Move it to the top level or pass it as a prop."
                : "Move it to the top level.",
            },
            messageId: "default",
            node: component,
          });
        }
      },
    },
  );
}
