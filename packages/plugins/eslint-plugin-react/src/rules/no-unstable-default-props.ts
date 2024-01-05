import type { TSESTreeFunction } from "@eslint-react/ast";
import { NodeType, readableNodeType } from "@eslint-react/ast";
import { isUnstableAssignmentPattern, useComponentCollector } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-default-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type ObjectDestructuringDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
};

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of unstable value as default param in function component",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSTABLE_DEFAULT_PROPS:
        "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable instead of {{forbiddenType}}.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const possibleDestructuringDeclarators = new WeakMap<
      TSESTreeFunction,
      ObjectDestructuringDeclarator[]
    >();

    return {
      ...listeners,
      "VariableDeclarator[id.type='ObjectPattern'][init.type='Identifier']"(node: ObjectDestructuringDeclarator) {
        O.map(
          ctx.getCurrentFunction(),
          ([currentFn]) =>
            possibleDestructuringDeclarators.set(currentFn, [
              ...possibleDestructuringDeclarators.get(currentFn) ?? [],
              node,
            ]),
        );
      },
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { node: component } of components.values()) {
          const { params } = component;
          const [props] = params;
          if (!props) continue;
          const properties = match(props)
            .with({ type: NodeType.ObjectPattern }, ({ properties }) => properties)
            .with({ type: NodeType.Identifier }, ({ name }) => {
              const variableDeclarators = possibleDestructuringDeclarators.get(component);
              if (!variableDeclarators) return [];
              const declarators = variableDeclarators.filter(d => d.init.name === name);

              return declarators.flatMap(d => d.id.properties);
            })
            .otherwise(() => []);
          for (const prop of properties) {
            if (prop.type !== NodeType.Property || prop.value.type !== NodeType.AssignmentPattern) continue;
            const { value } = prop;
            const { right } = value;
            if (!isUnstableAssignmentPattern(value)) continue;
            const forbiddenType = readableNodeType(right);
            context.report({
              data: {
                forbiddenType,
              },
              messageId: "NO_UNSTABLE_DEFAULT_PROPS",
              node: right,
            });
          }
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
