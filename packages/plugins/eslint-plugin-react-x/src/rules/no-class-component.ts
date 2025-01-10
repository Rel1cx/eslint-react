import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export function isComponentDidCatch(node: TSESTree.Node): node is
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition
{
  return (node.type === T.MethodDefinition || node.type === T.PropertyDefinition)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentDidCatch";
}

function isGetDerivedStateFromError(node: TSESTree.Node): node is
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition
{
  return (node.type === T.MethodDefinition || node.type === T.PropertyDefinition)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDerivedStateFromError";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using class components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noClassComponent: "Do not use class components. Use function components instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("Component")) {
      return {};
    }
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name = "anonymous", node: component } of components.values()) {
          if (component.body.body.some((m) => isComponentDidCatch(m) || isGetDerivedStateFromError(m))) {
            continue;
          }
          context.report({
            messageId: "noClassComponent",
            node: component,
            data: {
              // eslint-disable-next-line eslint-plugin/no-unused-placeholders
              name,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
