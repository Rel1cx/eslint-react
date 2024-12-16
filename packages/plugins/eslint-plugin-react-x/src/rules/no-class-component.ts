import { useComponentCollectorLegacy } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-class-component";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const isComponentDidCatch = isMatching({
  key: {
    type: AST_NODE_TYPES.Identifier,
    name: "componentDidCatch",
  },
  type: P.union(AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition),
  static: false,
});

const isGetDerivedStateFromError = isMatching({
  key: {
    type: AST_NODE_TYPES.Identifier,
    name: "getDerivedStateFromError",
  },
  type: P.union(AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition),
  static: true,
});

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
    if (!context.sourceCode.text.includes("Component")) return {};
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { name, node: component } of components.values()) {
          if (component.body.body.some(m => isComponentDidCatch(m) || isGetDerivedStateFromError(m))) continue;
          context.report({
            messageId: "noClassComponent",
            node: component,
            data: {
              // eslint-disable-next-line eslint-plugin/no-unused-placeholders
              name: O.getOrElse(F.constant("anonymous"))(name),
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
