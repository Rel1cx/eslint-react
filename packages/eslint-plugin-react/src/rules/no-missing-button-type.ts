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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
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

        const maybeTypeProperty = findPropInProperties(props.properties, context, initialScope)("type");

        if (O.isNone(maybeTypeProperty)) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node,
          });

          return;
        }

        const hasValidType = F.pipe(
          maybeTypeProperty,
          O.exists(M.isMatching({
            type: NodeType.Property,
            value: {
              type: NodeType.Literal,
              value: M.P.union(...validTypes),
            },
          })),
        );

        if (hasValidType) {
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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const maybeTypeAttribute = findPropInAttributes(attributes, context, initialScope)("type");

        if (O.isNone(maybeTypeAttribute)) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node,
          });

          return;
        }

        const hasValidType = F.pipe(
          maybeTypeAttribute,
          O.flatMap((a) => getPropValue(a, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(P.isString),
          O.exists((value) => validTypes.some((type) => type === value)),
        );

        if (hasValidType) {
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
