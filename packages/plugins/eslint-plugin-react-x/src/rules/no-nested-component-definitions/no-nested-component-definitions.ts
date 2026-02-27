import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

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
  const hint = core.ComponentDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithNullValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithStringValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.ComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
    | core.ComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayPattern
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayExpression
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  // Collectors to find all component definitions in the code
  const fCollector = core.useComponentCollector(context, { hint });
  const cCollector = core.useComponentCollectorLegacy(context);

  return defineRuleListener(
    fCollector.visitor,
    cCollector.visitor,
    {
      "Program:exit"(program) {
        // Gather all function and class components found by the collectors
        const fComponents = [...fCollector.ctx.getAllComponents(program)];
        const cComponents = [...cCollector.ctx.getAllComponents(program)];
        // Helper to find the enclosing component of a node
        function findEnclosingComponent(node: TSESTree.Node) {
          return ast.findParentNode(node, (n) => {
            if (ast.isFunction(n)) return fComponents.some((c) => c.node === n);
            if (ast.isClass(n)) return cComponents.some((c) => c.node === n);
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

/**
 * Determine whether the node is inside JSX attribute value
 * @param node The AST node to check
 * @returns `true` if the node is inside JSX attribute value
 */
function isInsideJSXAttributeValue(node: ast.TSESTreeFunction) {
  return node.parent.type === AST.JSXAttribute
    || core.findParentJsxAttribute(node, (n) => n.value?.type === AST.JSXExpressionContainer) != null;
}

/**
 * Check whether a given node is declared inside a class component's render block
 * Ex: class C extends React.Component { render() { const Nested = () => <div />; } }
 * @param node The AST node being checked
 * @returns `true` if the node is inside a class component's render block
 */
function isInsideRenderMethod(node: TSESTree.Node) {
  return ast.findParentNode(node, (n) => core.isRenderMethodLike(n) && core.isClassComponent(n.parent.parent)) != null;
}

/**
 * Determine whether the node is inside `createElement`'s props argument
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside `createElement`'s props
 */
function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node) {
  const call = ast.findParentNode(node, core.isCreateElementCall(context));
  if (call == null) return false;
  // Check if the node is within an object expression that is the second argument (props) of createElement
  const prop = ast.findParentNode(node, ast.is(AST.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}
