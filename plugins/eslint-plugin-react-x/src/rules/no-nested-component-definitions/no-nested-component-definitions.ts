import { createRule } from "@/utils/create-rule";
import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getWrapperCallBoundName, isInsideJSXAttributeValue, isInsideRenderMethod } from "./lib";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
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
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback;

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
        // Node sets for O(1) lookup when walking up the ancestor chain
        const fComponentNodes = new Set(fComponents.map((c) => c.node));
        const cComponentNodes = new Set(cComponents.map((c) => c.node));
        // Helper to find the enclosing component of a node
        function findEnclosingComponent(node: TSESTree.Node) {
          return Traverse.findParent(node, (n) => {
            if (Check.isFunction(n)) return fComponentNodes.has(n);
            if (Check.isClass(n)) return cComponentNodes.has(n);
            return false;
          });
        }
        // Iterate over function components to find nested definitions
        // eslint-disable-next-line prefer-const
        for (let { name, node: component } of fComponents) {
          // Fall back to the name bound through a wrapping call chain (e.g. `const C = useCallback(() => ..., [])`)
          // for components the collector could not name
          name ??= getWrapperCallBoundName(context, component);
          // Skip anonymous function components and names that don't follow component naming to reduce false positives
          if (name == null || !core.isFunctionComponentNameLoose(name)) continue;
          // Check if the component is defined inside a JSX attribute's value
          if (isInsideJSXAttributeValue(component)) {
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
          // Check if the component is defined inside the props of a `createElement` call
          if (core.isInsideCreateElementProps(context, component)) {
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
