import * as AST from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-mount";

export const RULE_FEATURES = [
  "CHK",
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentWillMount(node: TSESTree.ClassElement) {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentWillMount";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'componentWillMount'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noComponentWillMount: "[Deprecated] Use 'UNSAFE_componentWillMount' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentWillMount")) {
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
            if (isComponentWillMount(member)) {
              context.report({
                messageId: "noComponentWillMount",
                node: member,
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillMount");
                },
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
});
