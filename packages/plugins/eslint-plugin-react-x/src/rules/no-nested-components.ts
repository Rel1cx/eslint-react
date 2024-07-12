import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import { isClass, isFunction, NodeType, traverseUp, traverseUpGuard } from "@eslint-react/ast";
import {
  ERComponentHint,
  isDeclaredInRenderPropLoose,
  isDirectValueOfRenderPropertyLoose,
  isInsideCreateElementProps,
  isInsideRenderMethod,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import { traverseUpProp } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { O } from "@eslint-react/tools";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-components";

export type MessageID =
  | "NESTED_COMPONENT"
  | "NESTED_COMPONENT_IN_PROPS";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of unstable nested components",
    },
    messages: {
      NESTED_COMPONENT: "Do not nest components inside other components. Move it to the top level.",
      NESTED_COMPONENT_IN_PROPS: "Do not nest components inside props. Move it to the top level or pass it as a prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const hint = ERComponentHint.SkipMapCallback
      | ERComponentHint.SkipNullLiteral
      | ERComponentHint.SkipUndefinedLiteral
      | ERComponentHint.SkipBooleanLiteral
      | ERComponentHint.SkipStringLiteral
      | ERComponentHint.SkipNumberLiteral
      | ERComponentHint.StrictLogical
      | ERComponentHint.StrictConditional;

    const collector = useComponentCollector(context, hint);
    const collectorLegacy = useComponentCollectorLegacy();

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      "Program:exit"(node) {
        const functionComponents = Array.from(collector.ctx.getAllComponents(node).values());
        const classComponents = Array.from(collectorLegacy.ctx.getAllComponents(node).values());
        const isFunctionComponent = (node: TSESTree.Node): node is TSESTreeFunction => {
          return isFunction(node) && functionComponents.some(component => component.node === node);
        };
        const isClassComponent = (node: TSESTree.Node): node is TSESTreeClass => {
          return isClass(node) && classComponents.some(component => component.node === node);
        };
        for (const { name: componentName, node: component } of functionComponents) {
          // Do not mark objects containing render methods
          if (isDirectValueOfRenderPropertyLoose(component)) continue;
          // Do not mark anonymous function components to reduce false positives
          if (O.isNone(componentName)) continue;
          const name = componentName.value;
          const isInsideProperty = component.parent.type === NodeType.Property;
          const isInsideJSXPropValue = component.parent.type === NodeType.JSXAttribute
            || O.isSome(traverseUpProp(node, n => n.value?.type === NodeType.JSXExpressionContainer));
          if (isInsideJSXPropValue) {
            if (!isDeclaredInRenderPropLoose(component)) {
              context.report({
                data: {
                  name,
                },
                messageId: "NESTED_COMPONENT_IN_PROPS",
                node: component,
              });
            }

            continue;
          }
          if (isInsideCreateElementProps(component, context)) {
            context.report({
              data: {
                name,
              },
              messageId: "NESTED_COMPONENT_IN_PROPS",
              node: component,
            });

            continue;
          }
          const maybeParentComponent = traverseUpGuard(component, isFunctionComponent);
          if (O.isSome(maybeParentComponent) && !isDirectValueOfRenderPropertyLoose(maybeParentComponent.value)) {
            context.report({
              data: {
                name,
              },
              messageId: isInsideProperty ? "NESTED_COMPONENT_IN_PROPS" : "NESTED_COMPONENT",
              node: component,
            });

            continue;
          }
          const isInsideClassComponentRenderMethod = isInsideRenderMethod(component);
          if (isInsideClassComponentRenderMethod) {
            context.report({
              data: {
                name,
              },
              messageId: "NESTED_COMPONENT",
              node: component,
            });
          }
        }
        for (const { name, node: component } of classComponents) {
          if (O.isNone(traverseUp(component, node => isClassComponent(node) || isFunctionComponent(node)))) continue;
          context.report({
            data: {
              name: O.getOrElse(() => "unknown")(name),
            },
            messageId: "NESTED_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
