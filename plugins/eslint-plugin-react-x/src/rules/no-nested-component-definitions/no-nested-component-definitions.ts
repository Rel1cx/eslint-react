import { createRule } from "@/utils/create-rule";
import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { isInsideCreateElementProps } from "@eslint-react/jsx";
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
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Configuration hints to optimize component detection accuracy and performance
  const hint = core.FunctionComponentDetectionHint.DoNotIncludeJSXWithNumberValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithBooleanValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithNullValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithStringValue
    | core.FunctionComponentDetectionHint.DoNotIncludeJSXWithUndefinedValue
    | core.FunctionComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJSX
    | core.FunctionComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJSX
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback
    | core.FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback;

  const fc = core.getFunctionComponentCollector(context, { hint });
  const cc = core.getClassComponentCollector(context);

  return merge(
    fc.visitor,
    cc.visitor,
    {
      "Program:exit"(program) {
        const fComponents = [...fc.api.getAllComponents(program)];
        const cComponents = [...cc.api.getAllComponents(program)];
        // Node sets for O(1) lookup when walking up the ancestor chain
        const fComponentNodes = new Set(fComponents.map((c) => c.node));
        const cComponentNodes = new Set(cComponents.map((c) => c.node));

        /**
         * Finds the nearest enclosing component of a node.
         * @param node The node to start the search from.
         * @returns The enclosing function or class component, or `null` if there is none.
         */
        function findEnclosingComponent(node: TSESTree.Node) {
          return Traverse.findParent(node, (n) => {
            if (Check.isFunction(n)) return fComponentNodes.has(n);
            if (Check.isClass(n)) return cComponentNodes.has(n);
            return false;
          });
        }
        // eslint-disable-next-line prefer-const
        for (let { name, node: component } of fComponents) {
          // Fall back to the name bound through a wrapping call chain (e.g. `const C = useCallback(() => ..., [])`)
          // for components the collector could not name
          name ??= getWrapperCallBoundName(context, component);
          // Skip anonymous function components and names that don't follow component naming to reduce false positives
          if (name == null || !core.isFunctionComponentNameLoose(name)) continue;
          if (isInsideJSXAttributeValue(component)) {
            context.report({
              data: {
                suggestion: "Move it to the top level or pass it as a prop.",
              },
              messageId: "default",
              node: component,
            });
            continue;
          }
          if (isInsideCreateElementProps(context, component)) {
            context.report({
              data: {
                suggestion: "Move it to the top level or pass it as a prop.",
              },
              messageId: "default",
              node: component,
            });
            continue;
          }
          if (findEnclosingComponent(component) != null) {
            context.report({
              data: {
                suggestion: component.parent.type === AST.Property
                  ? "Move it to the top level or pass it as a prop."
                  : "Move it to the top level.",
              },
              messageId: "default",
              node: component,
            });
            continue;
          }
          if (isInsideRenderMethod(component)) {
            context.report({
              data: {
                suggestion: "Move it to the top level.",
              },
              messageId: "default",
              node: component,
            });
          }
        }
        for (const { node: component } of cComponents) {
          if (findEnclosingComponent(component) == null) continue;
          context.report({
            data: {
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
