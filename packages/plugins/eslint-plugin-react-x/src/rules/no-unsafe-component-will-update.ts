import * as AST from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isUnsafeComponentWillUpdate(node: TSESTree.ClassElement) {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "UNSAFE_componentWillUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns the usage of `UNSAFE_componentWillUpdate` in class components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeComponentWillUpdate: "Do not use 'UNSAFE_componentWillUpdate'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("UNSAFE_componentWillUpdate")) return {};
  const { ctx, listeners } = useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);

      for (const { node: component } of components.values()) {
        const { body } = component.body;

        for (const member of body) {
          if (isUnsafeComponentWillUpdate(member)) {
            context.report({
              messageId: "noUnsafeComponentWillUpdate",
              node: member,
            });
          }
        }
      }
    },
  };
}
