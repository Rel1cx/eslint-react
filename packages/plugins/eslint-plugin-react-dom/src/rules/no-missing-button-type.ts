import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInAttributes, findPropInProperties } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export type MessageID = ConstantCase<typeof RULE_NAME>;

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
        if (O.isSome(maybeTypeProperty)) return;
        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node: props,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;
        if (name.type !== NodeType.JSXIdentifier || name.name !== "button") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeTypeAttribute = findPropInAttributes(attributes, context, initialScope)("type");
        if (O.isSome(maybeTypeAttribute)) return;
        context.report({
          messageId: "NO_MISSING_BUTTON_TYPE",
          node: node.openingElement,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
