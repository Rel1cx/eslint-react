import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, getPropValue, isCreateElementCall } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const validTypes = [
  "allow-downloads",
  "allow-downloads-without-user-activation",
  "allow-forms",
  "allow-modals",
  "allow-orientation-lock",
  "allow-pointer-lock",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-presentation",
  "allow-same-origin",
  "allow-scripts",
  "allow-storage-access-by-user-activation",
  "allow-top-navigation",
  "allow-top-navigation-by-user-activation",
  "allow-top-navigation-to-custom-protocols",
] as const;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button elements have an explicit type attribute",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_MISSING_IFRAME_SANDBOX: "Missing explicit sandbox attribute for iframe",
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

        if (!isMatching({ type: NodeType.Literal, value: "iframe" }, name)) {
          return;
        }

        if (!props || props.type !== NodeType.ObjectExpression) {
          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node,
          });

          return;
        }

        const maybeTypeProperty = findPropInProperties(props.properties, context)("sandbox");

        if (O.isSome(maybeTypeProperty)) {
          const maybeTypeValue = F.pipe(
            maybeTypeProperty,
            O.filter(isMatching({
              type: NodeType.Property,
              value: {
                type: NodeType.Literal,
                value: P.union(...validTypes),
              },
            })),
          );

          if (O.isSome(maybeTypeValue)) {
            return;
          }

          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node,
          });

          return;
        }

        context.report({
          messageId: "NO_MISSING_IFRAME_SANDBOX",
          node,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;

        if (name.type !== NodeType.JSXIdentifier || name.name !== "iframe") {
          return;
        }

        const { attributes } = node.openingElement;

        const maybeTypeAttribute = findPropInAttributes(attributes, context)("sandbox");

        if (O.isSome(maybeTypeAttribute)) {
          const maybeTypeValue = F.pipe(
            getPropValue(maybeTypeAttribute.value, context),
            O.flatMapNullable(v => v?.value),
            O.filter(isString),
            O.map((value) => value.split(" ")),
            O.filter((values) => values.every((value) => validTypes.some((validType) => validType === value))),
          );

          if (O.isSome(maybeTypeValue)) {
            return;
          }

          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node,
          });

          return;
        }

        context.report({
          messageId: "NO_MISSING_IFRAME_SANDBOX",
          node,
        });
      },
    };
  },
});
