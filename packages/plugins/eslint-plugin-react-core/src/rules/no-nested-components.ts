import {
  isClass,
  isFunction,
  NodeType,
  traverseUp,
  traverseUpGuard,
  type TSESTreeClass,
  type TSESTreeFunction,
} from "@eslint-react/ast";
import {
  ERComponentHint,
  isInsideRenderMethod,
  unsafeIsDeclaredInRenderProp,
  unsafeIsDirectValueOfRenderProperty,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import { isInsideCreateElementProps, isInsidePropValue } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-components";

export type MessageID =
  | "NESTED_COMPONENT"
  | "NESTED_COMPONENT_IN_PROPS";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of unstable nested components",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NESTED_COMPONENT: "Do not nest components inside other components. Move it to the top level.",
      NESTED_COMPONENT_IN_PROPS: "Do not nest components inside props. Move it to the top level or pass it as a prop.",
    },
  },
  defaultOptions: [],
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
    const collectorLegacy = useComponentCollectorLegacy(context);

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
        for (const { node: component, name: componentName } of functionComponents) {
          // Do not mark objects containing render methods
          if (unsafeIsDirectValueOfRenderProperty(component)) continue;
          // Do not mark anonymous function components to reduce false positives
          if (O.isNone(componentName)) continue;
          const name = componentName.value;
          const isInsideProperty = component.parent.type === NodeType.Property;
          const isInsideJSXPropValue = isInsidePropValue(component);
          if (isInsideJSXPropValue) {
            if (!unsafeIsDeclaredInRenderProp(component)) {
              context.report({
                messageId: "NESTED_COMPONENT_IN_PROPS",
                node: component,
                data: {
                  name,
                },
              });
            }

            continue;
          }
          if (isInsideCreateElementProps(component, context)) {
            context.report({
              messageId: "NESTED_COMPONENT_IN_PROPS",
              node: component,
              data: {
                name,
              },
            });

            continue;
          }
          const maybeParentComponent = traverseUpGuard(component, isFunctionComponent);
          if (O.isSome(maybeParentComponent) && !unsafeIsDirectValueOfRenderProperty(maybeParentComponent.value)) {
            context.report({
              messageId: isInsideProperty ? "NESTED_COMPONENT_IN_PROPS" : "NESTED_COMPONENT",
              node: component,
              data: {
                name,
              },
            });

            continue;
          }
          const isInsideClassComponentRenderMethod = isInsideRenderMethod(component, context);
          if (isInsideClassComponentRenderMethod) {
            context.report({
              messageId: "NESTED_COMPONENT",
              node: component,
              data: {
                name,
              },
            });
          }
        }
        for (const { node: component, name } of classComponents) {
          if (O.isNone(traverseUp(component, node => isClassComponent(node) || isFunctionComponent(node)))) continue;
          context.report({
            messageId: "NESTED_COMPONENT",
            node: component,
            data: {
              name: O.getOrElse(() => "unknown")(name),
            },
          });
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
