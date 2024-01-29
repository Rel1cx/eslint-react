import { isOneOf, NodeType } from "@eslint-react/ast";
import { ERClassComponentFlag, useComponentCollectorLegacy } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isShouldComponentUpdate(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of `shouldComponentUpdate` in class component extends `React.PureComponent`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_REDUNDANT_SHOULD_COMPONENT_UPDATE:
        "{{componentName}} does not need `shouldComponentUpdate` when extending `React.PureComponent`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name, flag, node: component } of components.values()) {
          if (!(flag & ERClassComponentFlag.PureComponent)) continue;
          const { body } = component.body;
          for (const member of body) {
            if (isShouldComponentUpdate(member)) {
              context.report({
                messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
                node: member,
                data: {
                  componentName: O.getOrElse(() => "PureComponent")(name),
                },
              });
            }
          }
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
