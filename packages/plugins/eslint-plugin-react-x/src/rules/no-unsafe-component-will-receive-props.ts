import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-receive-props";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isUnsafeComponentWillReceiveProps(node: TSESTree.ClassElement) {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "UNSAFE_componentWillReceiveProps";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns the usage of `UNSAFE_componentWillReceiveProps` in class components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeComponentWillReceiveProps: "Do not use 'UNSAFE_componentWillReceiveProps'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("UNSAFE_componentWillReceiveProps")) {
    return {};
  }
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
              messageId: "noUnsafeComponentWillReceiveProps",
              node: member,
            });
          }
        }
      }
    },
  };
}
