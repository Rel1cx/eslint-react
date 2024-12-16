/* eslint-disable eslint-plugin/no-unused-placeholders */
import * as AST from "@eslint-react/ast";
import {
  ERComponentHint,
  isDeclaredInRenderPropLoose,
  isDirectValueOfRenderPropertyLoose,
  isInsideCreateElementProps,
  isInsideRenderMethod,
  useComponentCollector,
  useComponentCollectorLegacy,
} from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-nested-components";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "nestedComponent"
  | "nestedComponentInProps";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using unstable nested components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      nestedComponent: "Do not nest components inside other components. Move it to the top level.",
      nestedComponentInProps: "Do not nest components inside props. Move it to the top level or pass it as a prop.",
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
        const isFunctionComponent = (node: TSESTree.Node): node is AST.TSESTreeFunction => {
          return AST.isFunction(node) && functionComponents.some(component => component.node === node);
        };
        const isClassComponent = (node: TSESTree.Node): node is AST.TSESTreeClass => {
          return AST.isClass(node) && classComponents.some(component => component.node === node);
        };
        for (const { name: componentName, node: component } of functionComponents) {
          // Do not mark objects containing render methods
          if (isDirectValueOfRenderPropertyLoose(component)) continue;
          // Do not mark anonymous function components to reduce false positives
          if (O.isNone(componentName)) continue;
          const name = componentName.value;
          const isInsideProperty = component.parent.type === AST_NODE_TYPES.Property;
          const isInsideJSXPropValue = component.parent.type === AST_NODE_TYPES.JSXAttribute
            || O.isSome(JSX.traverseUpProp(node, n => n.value?.type === AST_NODE_TYPES.JSXExpressionContainer));
          if (isInsideJSXPropValue) {
            if (!isDeclaredInRenderPropLoose(component)) {
              context.report({
                messageId: "nestedComponentInProps",
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
              messageId: "nestedComponentInProps",
              node: component,
              data: {
                name,
              },
            });

            continue;
          }
          const maybeParentComponent = AST.traverseUpGuard(component, isFunctionComponent);
          if (O.isSome(maybeParentComponent) && !isDirectValueOfRenderPropertyLoose(maybeParentComponent.value)) {
            context.report({
              messageId: isInsideProperty ? "nestedComponentInProps" : "nestedComponent",
              node: component,
              data: {
                name,
              },
            });

            continue;
          }
          const isInsideClassComponentRenderMethod = isInsideRenderMethod(component);
          if (isInsideClassComponentRenderMethod) {
            context.report({
              messageId: "nestedComponent",
              node: component,
              data: {
                name,
              },
            });
          }
        }
        for (const { name, node: component } of classComponents) {
          if (O.isNone(AST.traverseUp(component, node => isClassComponent(node) || isFunctionComponent(node)))) {
            continue;
          }
          context.report({
            messageId: "nestedComponent",
            node: component,
            data: {
              name: O.getOrElse(() => "unknown")(name),
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
