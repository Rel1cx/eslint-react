import { isOneOf, NodeType } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-update";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isUnsafeComponentWillMount(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "UNSAFE_componentWillUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'UNSAFE_componentWillUpdate'",
    },
    messages: {
      noUnsafeComponentWillUpdate: "Do not use 'UNSAFE_componentWillUpdate'.",
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
            if (isUnsafeComponentWillMount(member)) {
              context.report({
                messageId: "noUnsafeComponentWillUpdate",
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
