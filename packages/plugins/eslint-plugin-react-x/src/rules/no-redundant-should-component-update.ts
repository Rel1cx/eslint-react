import * as AST from "@eslint-react/ast";
import { ERComponentFlag, useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isShouldComponentUpdate(node: TSESTree.ClassElement) {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'shouldComponentUpdate' in class component extends 'React.PureComponent'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noRedundantShouldComponentUpdate:
        "'{{componentName}}' does not need 'shouldComponentUpdate' when extending 'React.PureComponent'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("shouldComponentUpdate")) return {};
  const { ctx, listeners } = useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);

      for (const { name = "PureComponent", node: component, flag } of components.values()) {
        if ((flag & ERComponentFlag.PureComponent) === 0n) {
          continue;
        }
        const { body } = component.body;
        for (const member of body) {
          if (isShouldComponentUpdate(member)) {
            context.report({
              messageId: "noRedundantShouldComponentUpdate",
              node: member,
              data: {
                componentName: name,
              },
            });
          }
        }
      }
    },
  };
}
