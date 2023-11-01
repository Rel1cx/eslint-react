/* eslint-disable unicorn/no-keyword-prefix */
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
  isInsideRenderMethod,
  unsafeIsDeclaredInRenderProp,
  unsafeIsDirectValueOfRenderProperty,
  unsafeIsInsideReactHookCall,
} from "@eslint-react/core";
import { isInsideCreateElementProps, isInsidePropValue } from "@eslint-react/jsx";
import { E } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-nested-components";

export type MessageID = "UNSTABLE_NESTED_COMPONENT" | "UNSTABLE_NESTED_COMPONENT_IN_PROPS";

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
    const collector = componentCollector(context, { ignoreMapCall: true, ignoreNull: true, strict: true });
    const collectorLegacy = componentCollectorLegacy(context);

    return {
      ...collector.listeners,
      ...collectorLegacy.listeners,
      "Program:exit"() {
        const maybeFunctionComponents = collector.ctx.getAllComponents();
        if (E.isLeft(maybeFunctionComponents)) {
          console.error(maybeFunctionComponents.left);

          return;
        }
        const maybeClassComponents = collectorLegacy.ctx.getAllComponents();
        if (E.isLeft(maybeClassComponents)) {
          console.error(maybeClassComponents.left);

          return;
        }
        const functionComponents = maybeFunctionComponents.right;
        const classComponents = maybeClassComponents.right;
        const isFunctionComponent = (node: TSESTree.Node): node is TSESTreeFunction => {
          return isFunction(node) && functionComponents.includes(node);
        };
        const isClassComponent = (node: TSESTree.Node): node is TSESTreeClass => {
          return isClass(node) && classComponents.includes(node);
        };
        for (const component of functionComponents) {
          if (
            // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
            unsafeIsInsideReactHookCall(component)
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
          const parentComponent = traverseUpGuard(component, isFunctionComponent);
          if (parentComponent && !unsafeIsDirectValueOfRenderProperty(parentComponent)) {
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
        for (const component of classComponents) {
          if (!traverseUp(component, node => isClassComponent(node) || isFunctionComponent(node))) {
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
