import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { E, F, O } from "../lib/primitives";
import { AST, type FunctionNode } from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";
import * as ConstructionDetector from "../utils/construction-detector";

export const RULE_NAME = "no-constructed-context-value";

type MessageID =
    | "CONTEXT_VALUE_CONSTRUCTION"
    | "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
    | "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";

export default createEslintRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallows passing constructed values to context providers",
            recommended: "recommended",
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
        const { ctx, listeners } = ComponentCollector.make(context);

        const possibleValueConstructions = new Map<FunctionNode, ConstructionDetector.ConstructionType>();

        const detectConstruction = ConstructionDetector.make(context);

        return {
            ...listeners,
            JSXOpeningElement(node) {
                const openingElementName = node.name;
                if (!AST.is(N.JSXMemberExpression)(openingElementName)) {
                    return;
                }

                if (openingElementName.property.name !== "Provider") {
                    return;
                }

                const maybeJSXValueAttribute = O.fromNullable(
                    node.attributes.find((attribute) => {
                        return AST.is(N.JSXAttribute)(attribute) && attribute.name.name === "value";
                    }),
                );
                if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) {
                    return;
                }

                const valueNode = maybeJSXValueAttribute.value.value;
                if (!AST.is(N.JSXExpressionContainer)(valueNode)) {
                    return;
                }

                const valueExpression = valueNode.expression;
                const invocationScope = context.getScope();
                const constructionInfo = detectConstruction(valueExpression, invocationScope);
                if (constructionInfo._tag === "NONE") {
                    return;
                }

                F.pipe(
                    ctx.getCurrentFunction(),
                    O.map((currentFn) => possibleValueConstructions.set(currentFn, constructionInfo)),
                    E.fromOption(() => "Unexpected empty function stack"),
                    E.mapLeft(console.warn),
                );
            },
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const [fn, constructionInfo] of possibleValueConstructions.entries()) {
                    if (!components.has(fn) || constructionInfo._tag === "NONE") {
                        continue;
                    }

                    const messageId = constructionInfo._tag.startsWith("FUNCTION")
                        ? "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
                        : "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";

                    const { name, node } = constructionInfo;
                    context.report({
                        data: {
                            type: name,
                        },
                        messageId,
                        node,
                    });
                }
            },
        };
    },
});
