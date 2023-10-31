import { type Construction, constructionDetector, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/core";
import { E, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-constructed-context-value";

type MessageID =
  | "CONTEXT_VALUE_CONSTRUCTION"
  | "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
  | "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      CONTEXT_VALUE_CONSTRUCTION:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render.",
      CONTEXT_VALUE_CONSTRUCTION_FUNCTION:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useCallback hook.",
      CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER:
        "The {{type}} passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);
    const detectConstruction = constructionDetector(context);
    const possibleValueConstructions = new Map<TSESTreeFunction, Construction>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const openingElementName = node.name;
        if (openingElementName.type !== NodeType.JSXMemberExpression) {
          return;
        }

        if (openingElementName.property.name !== "Provider") {
          return;
        }

        const maybeJSXValueAttribute = O.fromNullable(
          node.attributes.find((attribute) => {
            return attribute.type === NodeType.JSXAttribute
              && attribute.name.name === "value";
          }),
        );
        if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) {
          return;
        }

        const valueNode = maybeJSXValueAttribute.value.value;
        if (valueNode?.type !== NodeType.JSXExpressionContainer) {
          return;
        }

        const valueExpression = valueNode.expression;
        const invocationScope = context.getScope();
        const constructionDetail = detectConstruction(valueExpression, invocationScope);

        if (constructionDetail._tag === "None") {
          return;
        }

        O.map(ctx.getCurrentFunction(), (currentFn) => possibleValueConstructions.set(currentFn, constructionDetail));
      },
      "Program:exit"() {
        const maybeComponents = ctx.getAllComponents();
        if (E.isLeft(maybeComponents)) {
          console.error(maybeComponents.left);

          return;
        }

        const components = maybeComponents.right;
        for (const [fn, detail] of possibleValueConstructions.entries()) {
          if (!components.includes(fn) || detail._tag === "None") {
            continue;
          }

          const messageId = detail._tag.startsWith("Function")
            ? "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
            : "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";
          const { _tag, node } = detail;

          context.report({
            data: {
              type: _tag.replaceAll("_", "").toLowerCase(),
            },
            messageId,
            node,
          });
        }
      },
    };
  },
});
