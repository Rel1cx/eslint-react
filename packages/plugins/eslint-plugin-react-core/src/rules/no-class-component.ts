import { NodeType } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import { type ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const isComponentDidCatch = isMatching({
  key: {
    type: NodeType.Identifier,
    name: "componentDidCatch",
  },
  static: false,
  type: P.union(NodeType.MethodDefinition, NodeType.PropertyDefinition),
});

const isGetDerivedStateFromError = isMatching({
  key: {
    type: NodeType.Identifier,
    name: "getDerivedStateFromError",
  },
  static: true,
  type: P.union(NodeType.MethodDefinition, NodeType.PropertyDefinition),
});

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow class component",
    },
    messages: {
      NO_CLASS_COMPONENT: "Do not use class components. Use function components instead.",
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

        for (const { name, node: component } of components.values()) {
          if (component.body.body.some(m => isComponentDidCatch(m) || isGetDerivedStateFromError(m))) continue;
          context.report({
            data: {
              name: O.getOrElse(F.constant("anonymous"))(name),
            },
            messageId: "NO_CLASS_COMPONENT",
            node: component,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
