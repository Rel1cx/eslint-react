import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createEslintRule } from "../helpers/create-eslint-rule";
import * as JSXUtils from "../helpers/jsx-utils";
import { I, O } from "../lib/data";

export const RULE_NAME = "jsx-handler-names";

type MessageIds = "badHandlerName" | "badPropKey";

const schema = [
    {
        anyOf: [
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    checkInlineFunction: { type: "boolean" },
                    checkLocalVariables: { type: "boolean" },
                    eventHandlerPrefix: { type: "string" },
                    eventHandlerPropPrefix: { type: "string" },
                },
            },
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    checkLocalVariables: { type: "boolean" },
                },
            },
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    checkInlineFunction: { type: "boolean" },
                },
            },
        ],
    },
] satisfies JSONSchema4[];

type Options = [
    {
        checkInlineFunction?: boolean;
        checkLocalVariables?: boolean;
        eventHandlerPrefix?: string;
        eventHandlerPropPrefix?: string;
    },
];

const defaultOptions = [
    {
        checkInlineFunction: true,
        checkLocalVariables: true,
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
    },
] satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce event handler naming conventions in JSX",
            recommended: "recommended",
        },
        schema,
        messages: {
            badHandlerName: "Handler function `{{ propKey }}` should be named `{{ handlerPrefix }}{{ propKey }}`",
            badPropKey: "Prop `{{ propValue }}` should be named `{{ handlerPropPrefix }}{{ propValue }}`",
        },
    },
    create(context) {
        const [{ checkInlineFunction, checkLocalVariables, eventHandlerPrefix, eventHandlerPropPrefix }] =
            context.options;

        return {
            JSXAttribute(node) {
                // Early return if the attribute is not an event handler.
                if (!node.value || !("expression" in node.value)) {
                    return;
                }

                const expression = node.value.expression;

                const maybeInnerExpression =
                    "body" in expression && "callee" in expression.body
                        ? O.fromNullable(expression.body.callee)
                        : O.none();

                const isInlineFunction = O.isSome(maybeInnerExpression);

                // Early return when not checking inline functions but the expression is an inline function.
                if (!checkInlineFunction && isInlineFunction) {
                    return;
                }

                const onlyLocalVariables = isInlineFunction
                    ? !Reflect.has(maybeInnerExpression.value, "object")
                    : !Reflect.has(expression, "object");

                // Early return when not checking local variables but the expression is a local variable.
                if (!checkLocalVariables && onlyLocalVariables) {
                    return;
                }

                const propKey = JSXUtils.getPropKey(node.name);
                const propValueNode = checkInlineFunction && isInlineFunction ? maybeInnerExpression.value : expression;

                const propValue = context
                    .getSourceCode()
                    .getText(propValueNode)
                    .replace(/\s*/gu, "")
                    // eslint-disable-next-line regexp/no-super-linear-move
                    .replace(/^this\.|.*::/u, "");

                // Early return if the prop key is not a string or if it is a ref.
                if (!I.isString(propKey) || propKey === "ref") {
                    return;
                }

                const propIsEventHandler = /^on[A-Z]/u.test(propKey);
                const propFnIsNamedCorrectly = /^handle[A-Z]/u.test(propValue);

                if (propIsEventHandler && !propFnIsNamedCorrectly) {
                    return context.report({
                        data: {
                            handlerPrefix: eventHandlerPrefix,
                            propKey,
                        },
                        messageId: "badHandlerName",
                        node,
                    });
                }

                if (propFnIsNamedCorrectly && !propIsEventHandler) {
                    return context.report({
                        data: {
                            handlerPropPrefix: eventHandlerPropPrefix,
                            propValue,
                        },
                        messageId: "badPropKey",
                        node,
                    });
                }
            },
        };
    },
    defaultOptions,
});
