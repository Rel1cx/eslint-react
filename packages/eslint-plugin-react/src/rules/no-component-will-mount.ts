import { isOneOf, NodeType } from "@eslint-react/ast";
import { componentCollectorLegacy } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-mount";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isComponentWillMount(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "componentWillMount";
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of `componentWillMount`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_COMPONENT_WILL_MOUNT: "Do not use `componentWillMount`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollectorLegacy(context);

    return {
      ...listeners,
      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          return;
        }
        const components = maybeComponents.right;

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isComponentWillMount(member)) {
              context.report({
                messageId: "NO_COMPONENT_WILL_MOUNT",
                node: member,
              });
            }
          }
        }
      },
    };
  },
});
