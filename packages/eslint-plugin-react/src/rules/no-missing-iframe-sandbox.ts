import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, getPropValue, isCreateElementCall } from "@eslint-react/jsx";
import { F, M, O, P } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

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
      description: "enforce that `iframe` elements explicitly specify a `sandbox` attribute",
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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        if (!isCreateElementCall(node, context)) {
          return;
        }

        const [name, props] = node.arguments;

        if (!M.isMatching({ type: NodeType.Literal, value: "iframe" }, name)) {
          return;
        }

        if (!props || props.type !== NodeType.ObjectExpression) {
          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node,
          });

          return;
        }

        const maybeTypeProperty = findPropInProperties(props.properties, context, initialScope)("sandbox");

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
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const maybeTypeAttribute = findPropInAttributes(attributes, context, initialScope)("sandbox");

        if (O.isSome(maybeTypeAttribute)) {
          const hasSandboxValue = F.pipe(
            getPropValue(maybeTypeAttribute.value, context),
            O.flatMapNullable(v => v?.value),
            O.filter(P.isString),
            O.map((value) => value.split(" ")),
            O.exists((values) => values.every((value) => validTypes.some((validType) => validType === value))),
          );

          if (hasSandboxValue) {
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
