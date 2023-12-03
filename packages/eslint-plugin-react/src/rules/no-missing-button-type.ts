import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, getPropValue, isCreateElementCall } from "@eslint-react/jsx";
import { F, M, O, P } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const validTypes = ["button", "submit", "reset"] as const;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce that `button` elements have an explicit `type` attribute",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_MISSING_BUTTON_TYPE: "Missing explicit type attribute for button",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isCreateElementCall(node, context)) {
          return;
        }

        const [name, props] = node.arguments;

        if (!M.isMatching({ type: NodeType.Literal, value: "button" }, name)) {
          return;
        }

        if (!props || props.type !== NodeType.ObjectExpression) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node,
          });

          return;
        }

        const maybeTypeProperty = findPropInProperties(props.properties, context)("type");

        if (O.isSome(maybeTypeProperty)) {
          const maybeTypeValue = F.pipe(
            maybeTypeProperty,
            O.filter(M.isMatching({
              type: NodeType.Property,
              value: {
                type: NodeType.Literal,
                value: M.P.union(...validTypes),
              },
            })),
          );

          if (O.isSome(maybeTypeValue)) {
            return;
          }

          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node,
          });

          return;
        }

        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;

        if (name.type !== NodeType.JSXIdentifier || name.name !== "button") {
          return;
        }

        const { attributes } = node.openingElement;

        const maybeTypeAttribute = findPropInAttributes(attributes, context)("type");

        if (O.isSome(maybeTypeAttribute)) {
          const isButtonTypeValue = F.pipe(
            getPropValue(maybeTypeAttribute.value, context),
            O.flatMapNullable(v => v?.value),
            O.filter(P.isString),
            O.exists((value) => validTypes.some((type) => type === value)),
          );

          if (isButtonTypeValue) {
            return;
          }

          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node,
          });

          return;
        }

        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node,
        });
      },
    };
  },
});
