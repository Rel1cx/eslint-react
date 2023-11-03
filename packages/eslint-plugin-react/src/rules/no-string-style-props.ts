import { NodeType } from "@eslint-react/ast";
import { elementType, findPropInAttributes, isCreateElementCall } from "@eslint-react/jsx";
import { getPropValue } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { isString } from "effect/Predicate";
import type { ConstantCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-style-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow using string as style props value",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      NO_STRING_STYLE_PROPS: "Do not use string as style props value. Use object instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          isCreateElementCall(node, context)
          && node.arguments.length > 1
        ) {
          const [component, props] = node.arguments;

          if (component?.type === NodeType.Identifier) {
            const componentName = component.name;

            if (componentName.toLowerCase() !== componentName) {
              return;
            }
          }

          if (props?.type !== NodeType.ObjectExpression) {
            return;
          }

          const style = props.properties.find(isMatching({
            key: {
              type: NodeType.Identifier,
              name: "style",
            },
            computed: false,
          }));

          if (!style || !("value" in style)) {
            return;
          }

          const styleValue = getStaticValue(style.value, context.getScope());

          if (!isString(styleValue?.value)) {
            return;
          }

          context.report({
            messageId: "NO_STRING_STYLE_PROPS",
            node: style,
          });
        }
      },
      JSXOpeningElement(node) {
        const name = elementType(node);
        if (typeof name !== "string" || name.toLowerCase() !== name) {
          return;
        }

        const { attributes } = node;

        const maybeStyleProp = findPropInAttributes(attributes, context)("style");

        if (O.isNone(maybeStyleProp)) {
          return;
        }

        const styleProp = maybeStyleProp.value;

        const maybeStyleValue = getPropValue(styleProp, context);

        if (O.isNone(maybeStyleValue)) {
          return;
        }

        const styleValue = maybeStyleValue.value;

        if (!isString(styleValue?.value)) {
          return;
        }

        context.report({
          messageId: "NO_STRING_STYLE_PROPS",
          node: styleProp,
        });
      },
    };
  },
});
