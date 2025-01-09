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
import { not, O, or } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
      | ERComponentHint.SkipUndefined
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
            && functionComponents.some(component => component.node === node);
        };
        const isClassComponent = (node: TSESTree.Node): node is AST.TSESTreeClass => {
          return AST.isClass(node)
            && classComponents.some(component => component.node === node);
        };
        for (const { name: componentName, node: component } of functionComponents) {
          // Do not mark objects containing render methods
          if (isDirectValueOfRenderPropertyLoose(component)) {
            continue;
          }
          // Do not mark anonymous function components to reduce false positives
          if (O.isNone(componentName)) {
            continue;
          }
          const name = componentName.value;
          const isInsideProperty = component.parent.type === T.Property;
          const isInsideJSXPropValue = component.parent.type === T.JSXAttribute
            || O.isSome(JSX.findParentProp(node, n => n.value?.type === T.JSXExpressionContainer));
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
          const isParnetComponentNotDirectValueOfRenderProperty = O.exists(
            AST.findParentNodeGuard(
              component,
              isFunctionComponent,
            ),
            not(isDirectValueOfRenderPropertyLoose),
          );

          if (isParnetComponentNotDirectValueOfRenderProperty) {
            context.report({
              messageId: isInsideProperty
                ? "nestedComponentInProps"
                : "nestedComponent",
              node: component,
              data: {
                name,
              },
            });

            continue;
          }
          if (isInsideRenderMethod(component)) {
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
          if (O.isNone(AST.findParentNode(component, or(isClassComponent, isFunctionComponent)))) {
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
