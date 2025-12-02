import * as AST from "@eslint-react/ast";
import {
  ComponentDetectionHint,
  findParentJsxAttribute,
  isClassComponent,
  isCreateElementCall,
  isDeclaredInRenderPropLoose,
  isDirectValueOfRenderPropertyLoose,
  isRenderMethodLike,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-component-definitions";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow nesting component definitions inside other components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noNestedComponentDefinitions:
        "Do not nest component definitions inside other components or props. {{suggestion}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Configuration hints to optimize component detection accuracy and performance
  const hint = ComponentDetectionHint.SkipArrayMapArgument
    | ComponentDetectionHint.SkipNullLiteral
    | ComponentDetectionHint.SkipUndefined
    | ComponentDetectionHint.SkipBooleanLiteral
    | ComponentDetectionHint.SkipStringLiteral
    | ComponentDetectionHint.SkipNumberLiteral
    | ComponentDetectionHint.StrictLogical
    | ComponentDetectionHint.StrictConditional;

  // Collectors to find all component definitions in the code
  const fCollector = useComponentCollector(context, { hint });
  const cCollector = useComponentCollectorLegacy();

  return {
    ...fCollector.listeners,
    ...cCollector.listeners,
    "Program:exit"(program) {
      // Gather all function and class components found by the collectors
      const fComponents = [...fCollector.ctx.getAllComponents(program)];
      const cComponents = [...cCollector.ctx.getAllComponents(program)];
      // Helper to check if a node is a collected function component
      const isFunctionComponent = (node: TSESTree.Node): node is AST.TSESTreeFunction => {
        return AST.isFunction(node)
          && fComponents.some((component) => component.node === node);
      };
      // Helper to check if a node is a collected class component
      const isClassComponent = (node: TSESTree.Node): node is AST.TSESTreeClass => {
        return AST.isClass(node)
          && cComponents.some((component) => component.node === node);
      };
      // Iterate over function components to find nested definitions
      for (const { name, node: component } of fComponents) {
        // Skip anonymous function components to reduce false positives
        if (name == null) continue;
        // Skip components that are directly returned from a render prop
        if (isDirectValueOfRenderPropertyLoose(component)) continue;
        // Check if the component is defined inside a JSX attribute's value
        if (isInsideJSXAttributeValue(component)) {
          // Allow if it's part of a render prop pattern
          if (!isDeclaredInRenderPropLoose(component)) {
            context.report({
              messageId: "noNestedComponentDefinitions",
              node: component,
              data: {
                name,
                suggestion: "Move it to the top level or pass it as a prop.",
              },
            });
          }

          continue;
        }
        // Check if the component is defined inside the props of a `createElement` call
        if (isInsideCreateElementProps(context, component)) {
          context.report({
            messageId: "noNestedComponentDefinitions",
            node: component,
            data: {
              name,
              suggestion: "Move it to the top level or pass it as a prop.",
            },
          });

          continue;
        }
        // Check for direct nesting inside another function component
        const parentComponent = AST.findParentNode(component, isFunctionComponent);
        if (parentComponent != null && !isDirectValueOfRenderPropertyLoose(parentComponent)) {
          context.report({
            messageId: "noNestedComponentDefinitions",
            node: component,
            data: {
              name,
              suggestion: component.parent.type === T.Property
                ? "Move it to the top level or pass it as a prop."
                : "Move it to the top level.",
            },
          });

          continue;
        }
        // Check if the component is defined inside a class component's render method
        if (isInsideRenderMethod(component)) {
          context.report({
            messageId: "noNestedComponentDefinitions",
            node: component,
            data: {
              name,
              suggestion: "Move it to the top level.",
            },
          });
        }
      }
      // Iterate over class components to find nested definitions
      for (const { name = "unknown", node: component } of cComponents) {
        // Find if the parent is another component
        if (AST.findParentNode(component, (n) => isClassComponent(n) || isFunctionComponent(n)) == null) {
          continue;
        }
        context.report({
          messageId: "noNestedComponentDefinitions",
          node: component,
          data: {
            name,
            suggestion: component.parent.type === T.Property
              ? "Move it to the top level or pass it as a prop."
              : "Move it to the top level.",
          },
        });
      }
    },
  };
}

/**
 * Determines whether the node is inside JSX attribute value
 * @param node The AST node to check
 * @returns `true` if the node is inside JSX attribute value
 */
function isInsideJSXAttributeValue(node: AST.TSESTreeFunction) {
  return node.parent.type === T.JSXAttribute
    || findParentJsxAttribute(node, (n) => n.value?.type === T.JSXExpressionContainer) != null;
}

/**
 * Checks whether a given node is declared inside a class component's render block
 * Ex: class C extends React.Component { render() { const Nested = () => <div />; } }
 * @param node The AST node being checked
 * @returns `true` if the node is inside a class component's render block
 */
function isInsideRenderMethod(node: TSESTree.Node) {
  return AST.findParentNode(node, (n) => isRenderMethodLike(n) && isClassComponent(n.parent.parent)) != null;
}

/**
 * Determines whether the node is inside `createElement`'s props argument
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside `createElement`'s props
 */
function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node) {
  const call = AST.findParentNode(node, isCreateElementCall(context));
  if (call == null) return false;
  // Check if the node is within an object expression that is the second argument (props) of createElement
  const prop = AST.findParentNode(node, AST.is(T.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}
