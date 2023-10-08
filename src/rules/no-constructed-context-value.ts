import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import { E, F, O } from "../lib";
import type * as AST from "../utils/ast-types";
import * as ComponentCollector from "../utils/component-collector";
import * as ConstructionDetector from "../utils/construction-detector";

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
            description: "disallows passing constructed values to context providers",
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
        const { ctx, listeners } = ComponentCollector.make(context);
        const detectConstruction = ConstructionDetector.make(context);
        const possibleValueConstructions = new Map<AST.TSESTreeFunction, ConstructionDetector.Construction>();

        return {
            ...listeners,
            JSXOpeningElement(node) {
                const openingElementName = node.name;
                if (openingElementName.type !== N.JSXMemberExpression) {
                    return;
                }

                if (openingElementName.property.name !== "Provider") {
                    return;
                }

                const maybeJSXValueAttribute = O.fromNullable(
                    node.attributes.find((attribute) => {
                        return attribute.type === N.JSXAttribute
                            && attribute.name.name === "value";
                    }),
                );
                if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) {
                    return;
                }

                const valueNode = maybeJSXValueAttribute.value.value;
                if (valueNode?.type !== N.JSXExpressionContainer) {
                    return;
                }

                const valueExpression = valueNode.expression;
                const invocationScope = context.getScope();
                const constructionDetail = detectConstruction(valueExpression, invocationScope);
                if (constructionDetail._tag === "None") {
                    return;
                }

                F.pipe(
                    ctx.getCurrentFunction(),
                    O.map((currentFn) => possibleValueConstructions.set(currentFn, constructionDetail)),
                    E.fromOption(() => "Unexpected empty function stack"),
                    E.mapLeft(console.warn),
                );
            },
            "Program:exit"() {
                const components = ctx.getAllComponents();

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
