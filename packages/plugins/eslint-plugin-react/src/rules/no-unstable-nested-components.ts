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
  componentCollector,
  componentCollectorLegacy,
  ERComponentCollectorHint,
  isInsideReactHookCall,
  isInsideRenderMethod,
  unsafeIsDeclaredInRenderProp,
  unsafeIsDirectValueOfRenderProperty,
} from "@eslint-react/core";
import { isInsideCreateElementProps, isInsidePropValue } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-nested-components";

export type MessageID =
  | "UNSTABLE_NESTED_COMPONENT"
  | "UNSTABLE_NESTED_COMPONENT_IN_PROPS";

// TODO: add more details to the report messages and data
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
      UNSTABLE_NESTED_COMPONENT: "Do not nest components inside other components. Move it to the top level.",
      UNSTABLE_NESTED_COMPONENT_IN_PROPS:
        "Do not nest components inside props. Move it to the top level or pass it as a prop.",
    },
  },
  defaultOptions: [],
  create(context) {
    const hint = ERComponentCollectorHint.SkipMapCallback
      | ERComponentCollectorHint.SkipNullLiteral
      | ERComponentCollectorHint.SkipUndefinedLiteral
      | ERComponentCollectorHint.SkipBooleanLiteral
      | ERComponentCollectorHint.SkipStringLiteral
      | ERComponentCollectorHint.SkipNumberLiteral
      | ERComponentCollectorHint.StrictLogical
      | ERComponentCollectorHint.StrictConditional;

    const collector = componentCollector(context, hint);
    const collectorLegacy = componentCollectorLegacy(context);

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
        for (const { node: component } of functionComponents) {
          if (
            // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
            isInsideReactHookCall(component)
            // Do not mark objects containing render methods
            || unsafeIsDirectValueOfRenderProperty(component)
          ) {
            continue;
          }
          const isInsideProperty = component.parent.type === NodeType.Property;
          const isInsideJSXPropValue = isInsidePropValue(component);
          if (isInsideJSXPropValue) {
            if (!unsafeIsDeclaredInRenderProp(component)) {
              context.report({
                messageId: "UNSTABLE_NESTED_COMPONENT_IN_PROPS",
                node: component,
              });
            }

            continue;
          }
          if (isInsideCreateElementProps(component, context)) {
            context.report({
              messageId: "UNSTABLE_NESTED_COMPONENT_IN_PROPS",
              node: component,
            });

            continue;
          }
          const maybeParentComponent = traverseUpGuard(component, isFunctionComponent);
          if (O.isSome(maybeParentComponent) && !unsafeIsDirectValueOfRenderProperty(maybeParentComponent.value)) {
            context.report({
              messageId: isInsideProperty ? "UNSTABLE_NESTED_COMPONENT_IN_PROPS" : "UNSTABLE_NESTED_COMPONENT",
              node: component,
            });

            continue;
          }
          const isInsideClassComponentRenderMethod = isInsideRenderMethod(component, context);
          if (isInsideClassComponentRenderMethod) {
            context.report({
              messageId: "UNSTABLE_NESTED_COMPONENT",
              node: component,
            });
          }
        }
        for (const { node: component } of classComponents) {
          if (O.isNone(traverseUp(component, node => isClassComponent(node) || isFunctionComponent(node)))) {
            continue;
          }

          context.report({
            messageId: "UNSTABLE_NESTED_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
});
