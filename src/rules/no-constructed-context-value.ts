import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { E, F, O } from "../lib/primitives/data";
import { AST, type FunctionNode } from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";
import * as ConstructionDetector from "../utils/construction-detector";
import { ConstructionType } from "../utils/construction-detector";

const RULE_NAME: RuleName = "no-constructed-context-value";

type MessageID =
    | "CONTEXT_VALUE_CONSTRUCTION"
    | "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
    | "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageID>({
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
    defaultOptions,
    create(context) {
        const collector = ComponentCollector.make(context);

        const possibleValueConstructions = new Map<FunctionNode, ConstructionDetector.ConstructionInfo>();

        const detectConstruction = ConstructionDetector.make(context);

        return {
            ...collector.listeners,
            JSXOpeningElement(node) {
                const openingElementName = node.name;
                if (!AST.is(AST_NODE_TYPES.JSXMemberExpression)(openingElementName)) {
                    // Has no member
                    return;
                }

                if (openingElementName.property.name !== "Provider") {
                    // Member is not Provider
                    return;
                }

                const maybeJSXValueAttribute = O.fromNullable(
                    node.attributes.find((attribute) => {
                        return AST.is(AST_NODE_TYPES.JSXAttribute)(attribute) && attribute.name.name === "value";
                    }),
                );

                if (O.isNone(maybeJSXValueAttribute) || !("value" in maybeJSXValueAttribute.value)) {
                    return;
                }

                const valueNode = maybeJSXValueAttribute.value.value;

                if (!AST.is(AST_NODE_TYPES.JSXExpressionContainer)(valueNode)) {
                    // value could be a literal
                    return;
                }

                const valueExpression = valueNode.expression;
                const invocationScope = context.getScope();

                // // Check if the value prop is a construction
                const maybeConstructionInfo = detectConstruction(valueExpression, invocationScope);

                if (O.isNone(maybeConstructionInfo)) {
                    return;
                }

                const constructionInfo = maybeConstructionInfo.value;

                F.pipe(
                    collector.getCurrentFunction(),
                    O.map((currentFn) => possibleValueConstructions.set(currentFn, constructionInfo)),
                    E.fromOption(() => "Unexpected empty function stack"),
                    E.mapLeft(console.warn),
                );
            },
            "Program:exit"() {
                const components = collector.getComponents();

                for (const [fn, constructionInfo] of possibleValueConstructions.entries()) {
                    if (!components.has(fn)) {
                        continue;
                    }

                    const { type, node } = constructionInfo;

                    const messageId = match<ConstructionType, MessageID>(type)
                        .with(ConstructionType.FUNCTION_DECLARATION, () => {
                            return "CONTEXT_VALUE_CONSTRUCTION_FUNCTION";
                        })
                        .with(ConstructionType.FUNCTION_EXPRESSION, () => {
                            return "CONTEXT_VALUE_CONSTRUCTION_FUNCTION";
                        })
                        .otherwise(() => {
                            return "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER";
                        });

                    context.report({
                        data: {
                            type,
                        },
                        messageId,
                        node,
                    });
                }
            },
        };
    },
});
