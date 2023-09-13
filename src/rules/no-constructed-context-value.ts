import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { I, MutList, O } from "../lib/primitives/data";
import { AST, type FunctionNode } from "../utils/ast";
import * as ConstructionDetector from "../utils/construction-detector";
import { ConstructionType } from "../utils/construction-detector";
import { isComponentName } from "../utils/is-component-name";
import { isJSXValue, isReturningJSX } from "../utils/jsx";

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
        const components = new Set<FunctionNode>();

        const functionStack = MutList.make<FunctionNode>();

        const possibleValueConstructions = new Map<FunctionNode, ConstructionDetector.ConstructionInfo>();

        const detectConstruction = ConstructionDetector.make(context);

        const onFunctionEnter = (node: FunctionNode) => MutList.append(functionStack, node);

        const onFunctionExit = () => MutList.pop(functionStack);

        return {
            ArrowFunctionExpression: onFunctionEnter,
            "ArrowFunctionExpression:exit": onFunctionExit,
            FunctionDeclaration: onFunctionEnter,
            "FunctionDeclaration:exit": onFunctionExit,
            FunctionExpression: onFunctionEnter,
            "FunctionExpression:exit": onFunctionExit,
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

                // Check if the value prop is a construction
                const maybeConstructionInfo = detectConstruction(valueExpression, invocationScope);

                if (O.isNone(maybeConstructionInfo)) {
                    return;
                }

                const constructionInfo = maybeConstructionInfo.value;

                const currentFn = MutList.tail(functionStack);

                // eslint-disable-next-line sonarjs/no-duplicate-string
                invariant(currentFn, "Unexpected empty function stack");

                possibleValueConstructions.set(currentFn, constructionInfo);
            },
            ReturnStatement(node) {
                const returnStatements = AST.getNestedReturnStatements(node);

                const hasJsx = returnStatements.some((returnStatement) => isReturningJSX(returnStatement, context));

                if (!hasJsx || MutList.isEmpty(functionStack)) {
                    return;
                }

                const currentFn = MutList.tail(functionStack);

                invariant(currentFn, "Unexpected empty function stack");

                const maybeName = O.fromNullable(currentFn.id?.name);

                if (O.isSome(maybeName) && !isComponentName(maybeName.value)) {
                    return;
                }

                components.add(currentFn);
            },
            // eslint-disable-next-line perfectionist/sort-objects
            "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
                const { body } = node;

                const hasJsx = isJSXValue(body, context, false, false);

                if (!hasJsx || MutList.isEmpty(functionStack)) {
                    return;
                }

                const currentFn = MutList.tail(functionStack);

                invariant(currentFn, "Unexpected empty function stack");

                const { parent } = currentFn;

                if ("id" in parent && !I.isNullable(parent.id) && "name" in parent.id) {
                    const { name } = parent.id;

                    if (!isComponentName(name)) {
                        return;
                    }
                }

                components.add(currentFn);
            },
            "Program:exit"() {
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
