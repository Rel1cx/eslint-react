import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInAttributes, findPropInProperties, getPropValue } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O, Predicate as Prd } from "effect";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const validTypes = ["button", "submit", "reset"] as const;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button component have an explicit 'type' attribute",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_MISSING_BUTTON_TYPE: "Add missing 'type' attribute on 'button' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope(node);
        if (!isCreateElementCall(node, context)) return;
        const [name, props] = node.arguments;
        if (!isMatching({ type: NodeType.Literal, value: "button" }, name)) return;
        if (!props || props.type !== NodeType.ObjectExpression) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node: props ?? node,
          });
          return;
        }
        const maybeTypeProperty = findPropInProperties(props.properties, context, initialScope)("type");
        if (O.isNone(maybeTypeProperty)) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node: props,
          });
          return;
        }
        const typeProperty = maybeTypeProperty.value;
        const hasValidType = isMatching({
          type: NodeType.Property,
          value: {
            type: NodeType.Literal,
            value: P.union(...validTypes),
          },
        }, typeProperty);

        if (hasValidType) return;
        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node: typeProperty,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;
        if (name.type !== NodeType.JSXIdentifier || name.name !== "button") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeTypeAttribute = findPropInAttributes(attributes, context, initialScope)("type");
        if (O.isNone(maybeTypeAttribute)) {
          context.report({
            messageId: "NO_MISSING_BUTTON_TYPE",
            node: node.openingElement,
          });
          return;
        }
        const typeAttribute = maybeTypeAttribute.value;
        const hasValidType = F.pipe(
          getPropValue(typeAttribute, context),
          O.flatMapNullable(v => v?.value),
          O.filter(Prd.isString),
          O.exists((value) => validTypes.some((type) => type === value)),
        );
        if (hasValidType) return;
        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node: typeAttribute,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
