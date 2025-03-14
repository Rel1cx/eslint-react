import * as AST from "@eslint-react/ast";
import {
  ERComponentHint,
  isCreateElementCall,
  isDeclaredInRenderPropLoose,
  isDirectValueOfRenderPropertyLoose,
  isInsideRenderMethod,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-component-definitions";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noNestedComponentDefinition"
  | "noNestedComponentDefinitionInProps";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using unstable nested components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noNestedComponentDefinition:
        "Do not nest component definitions inside other components. Move it to the top level.",
      noNestedComponentDefinitionInProps:
        "Do not nest component definitions inside props. Move it to the top level or pass it as a prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hint = ERComponentHint.SkipMapCallback
    | ERComponentHint.SkipNullLiteral
    | ERComponentHint.SkipUndefined
    | ERComponentHint.SkipBooleanLiteral
    | ERComponentHint.SkipStringLiteral
    | ERComponentHint.SkipNumberLiteral
    | ERComponentHint.StrictLogical
    | ERComponentHint.StrictConditional;

  const collector = useComponentCollector(context, { hint });
  const collectorLegacy = useComponentCollectorLegacy();

  return {
    ...collector.listeners,
    ...collectorLegacy.listeners,
    "Program:exit"(node) {
      const functionComponents = [
        ...collector
          .ctx
          .getAllComponents(node)
          .values(),
      ];
      const classComponents = [
        ...collectorLegacy
          .ctx
          .getAllComponents(node)
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
        // Do not mark objects containing render methods
        if (isDirectValueOfRenderPropertyLoose(component)) {
          continue;
        }
        // Do not mark anonymous function components to reduce false positives
        if (name == null) {
          continue;
        }
        const isInsideProperty = component.parent.type === T.Property;
        const isInsideJSXPropValue = component.parent.type === T.JSXAttribute
          || JSX.findParentAttribute(node, (n) => n.value?.type === T.JSXExpressionContainer) != null;
        if (isInsideJSXPropValue) {
          if (!isDeclaredInRenderPropLoose(component)) {
            context.report({
              messageId: "noNestedComponentDefinitionInProps",
              node: component,
              data: {
                name,
              },
            });
          }

          continue;
        }
        if (isInsideCreateElementProps(context, component)) {
          context.report({
            messageId: "noNestedComponentDefinitionInProps",
            node: component,
            data: {
              name,
            },
          });

          continue;
        }
        const parentComponent = AST.findParentNode(component, isFunctionComponent);
        const isParentComponentNotDirectValueOfRenderProperty = parentComponent != null
          && !isDirectValueOfRenderPropertyLoose(parentComponent);
        if (isParentComponentNotDirectValueOfRenderProperty) {
          context.report({
            messageId: isInsideProperty
              ? "noNestedComponentDefinitionInProps"
              : "noNestedComponentDefinition",
            node: component,
            data: {
              name,
            },
          });

          continue;
        }
        if (isInsideRenderMethod(component)) {
          context.report({
            messageId: "noNestedComponentDefinition",
            node: component,
            data: {
              name,
            },
          });
        }
      }
      for (const { name = "unknown", node: component } of classComponents) {
        if (AST.findParentNode(component, (n) => isClassComponent(n) || isFunctionComponent(n)) == null) {
          continue;
        }
        context.report({
          messageId: "noNestedComponentDefinition",
          node: component,
          data: {
            name,
          },
        });
      }
    },
  };
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
