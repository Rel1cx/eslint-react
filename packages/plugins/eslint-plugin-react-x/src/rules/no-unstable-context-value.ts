import * as AST from "@eslint-react/ast";
import { useComponentCollector } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-context-value";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noUnstableContextValue"
  | "noUnstableContextValueWithFunction"
  | "noUnstableContextValueWithIdentifier";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnstableContextValue:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render.",
      noUnstableContextValueWithFunction:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useCallback hook.",
      noUnstableContextValueWithIdentifier:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollector(context);
    const constructions = new Map<AST.TSESTreeFunction, VAR.Construction[]>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const openingElementName = node.name;
        if (openingElementName.type !== AST_NODE_TYPES.JSXMemberExpression) return;
        if (openingElementName.property.name !== "Provider") return;
        const constructionEntry = F.pipe(
          O.Do,
          O.bind("function", ctx.getCurrentFunction),
          O.bind("attribute", () =>
            O.fromNullable(
              node.attributes.find((attribute) => {
                return attribute.type === AST_NODE_TYPES.JSXAttribute
                  && attribute.name.name === "value";
              }),
            )),
          O.bind("value", ({ attribute }) => "value" in attribute ? O.some(attribute.value) : O.none()),
          O.bind("valueExpression", ({ value }) =>
            value?.type === AST_NODE_TYPES.JSXExpressionContainer
              ? O.some(value.expression)
              : O.none()),
          O.bind("construction", ({ valueExpression }) => {
            const initialScope = context.sourceCode.getScope(valueExpression);
            return O.some(VAR.inspectConstruction(valueExpression, initialScope));
          }),
          O.filter(({ construction }) => construction._tag !== "None"),
        );
        for (const { construction, function: [_, fNode] } of O.toArray(constructionEntry)) {
          constructions.set(fNode, [
            ...constructions.get(fNode) ?? [],
            construction,
          ]);
        }
      },
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node).values();
        for (const { node: component } of components) {
          for (const construction of constructions.get(component) ?? []) {
            if (construction._tag === "None") continue;
            const { node: constructionNode, _tag } = construction;
            const messageId = _tag.startsWith("Function")
              ? "noUnstableContextValueWithFunction"
              : "noUnstableContextValueWithIdentifier";
            context.report({
              messageId,
              node: constructionNode,
              data: {
                type: AST.toReadableNodeType(constructionNode),
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
