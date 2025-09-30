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
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
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
  const hint = ComponentDetectionHint.SkipArrayMapArgument
    | ComponentDetectionHint.SkipNullLiteral
    | ComponentDetectionHint.SkipUndefined
    | ComponentDetectionHint.SkipBooleanLiteral
    | ComponentDetectionHint.SkipStringLiteral
    | ComponentDetectionHint.SkipNumberLiteral
    | ComponentDetectionHint.StrictLogical
    | ComponentDetectionHint.StrictConditional;

  const collector = useComponentCollector(context, { hint });
  const collectorLegacy = useComponentCollectorLegacy();

  return {
    ...collector.listeners,
    ...collectorLegacy.listeners,
    "Program:exit"(program) {
      const functionComponents = [
        ...collector
          .ctx
          .getAllComponents(program)
          .values(),
      ];
      const classComponents = [
        ...collectorLegacy
          .ctx
          .getAllComponents(program)
          .values(),
      ];
      const isFunctionComponent = (node: TSESTree.Node): node is AST.TSESTreeFunction => {
        return AST.isFunction(node)
          && functionComponents.some((component) => component.node === node);
      };
      const isClassComponent = (node: TSESTree.Node): node is AST.TSESTreeClass => {
        return AST.isClass(node)
          && classComponents.some((component) => component.node === node);
      };
      for (const { name, node: component } of functionComponents) {
        // Do not mark anonymous function components to reduce false positives
        if (name == null) continue;
        // Do not mark objects containing render methods
        if (isDirectValueOfRenderPropertyLoose(component)) continue;
        if (isInsideJSXAttributeValue(component)) {
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
      for (const { name = "unknown", node: component } of classComponents) {
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
 * Check whether given node is declared inside class component's render block
 * ```tsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @returns `true` if node is inside class component's render block, `false` if not
 */
function isInsideRenderMethod(node: TSESTree.Node) {
  return AST.findParentNode(node, (n) => isRenderMethodLike(n) && isClassComponent(n.parent.parent)) != null;
}

/**
 * Determines whether inside `createElement`'s props.
 * @param context The rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside createElement's props
 */
function isInsideCreateElementProps(context: RuleContext, node: TSESTree.Node) {
  const call = AST.findParentNode(node, isCreateElementCall(context));
  if (call == null) return false;
  const prop = AST.findParentNode(node, AST.is(T.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}
