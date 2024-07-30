import type { Construction, TSESTreeFunction } from "@eslint-react/ast";
import { inspectConstruction, NodeType, readableNodeType } from "@eslint-react/ast";
import { useComponentCollector } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-context-value";

export type MessageID =
  | "NO_UNSTABLE_CONTEXT_VALUE"
  | "NO_UNSTABLE_CONTEXT_VALUE_WITH_FUNCTION"
  | "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
    },
    messages: {
      NO_UNSTABLE_CONTEXT_VALUE:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render.",
      NO_UNSTABLE_CONTEXT_VALUE_WITH_FUNCTION:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useCallback hook.",
      NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const possibleValueConstructions = new Map<TSESTreeFunction, Construction[]>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const openingElementName = node.name;
        if (openingElementName.type !== NodeType.JSXMemberExpression) return;
        if (openingElementName.property.name !== "Provider") return;
        const maybeJSXValueAttribute = O.fromNullable(
          node.attributes.find((attribute) => {
            return attribute.type === NodeType.JSXAttribute
              && attribute.name.name === "value";
          }),
        );
        if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) return;
        const valueNode = maybeJSXValueAttribute.value.value;
        if (valueNode?.type !== NodeType.JSXExpressionContainer) return;
        const valueExpression = valueNode.expression;
        const construction = inspectConstruction(valueExpression, context);
        if (construction._tag === "None") return;
        O.map(
          ctx.getCurrentFunction(),
          ([_, currentFn]) =>
            possibleValueConstructions.set(currentFn, [
              ...possibleValueConstructions.get(currentFn) ?? [],
              construction,
            ]),
        );
      },
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node).values();
        for (const { node: component } of components) {
          const constructions = possibleValueConstructions.get(component);
          if (!constructions) continue;
          for (const construction of constructions) {
            if (construction._tag === "None") continue;
            const { _tag, node: constructionNode } = construction;
            const messageId = _tag.startsWith("Function")
              ? "NO_UNSTABLE_CONTEXT_VALUE_WITH_FUNCTION"
              : "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER";
            context.report({
              data: {
                type: readableNodeType(constructionNode),
              },
              messageId,
              node: constructionNode,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
