import { isOneOf, NodeType } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-receive-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isUnsafeComponentWillReceiveProps(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "UNSAFE_componentWillReceiveProps";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of 'UNSAFE_componentWillReceiveProps'",
    },
    messages: {
      NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS: "Do not use 'UNSAFE_componentWillReceiveProps'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isUnsafeComponentWillReceiveProps(member)) {
              context.report({
                messageId: "NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS",
                node: member,
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
