/* eslint-disable security/detect-non-literal-regexp */
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { I, O } from "../primitives/data";
import { createEslintRule } from "../tools/create-eslint-rule";
import * as JSXUtils from "../utils/jsx-utils";

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
                    checkInlineFunction: { type: "boolean" },
                    checkLocalVariables: { type: "boolean" },
                    eventHandlerPrefix: { type: "string" },
                    eventHandlerPropPrefix: {
                        type: "boolean",
                        enum: [false],
                    },
                },
            },
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    checkInlineFunction: { type: "boolean" },
                    checkLocalVariables: { type: "boolean" },
                    eventHandlerPrefix: {
                        type: "boolean",
                        enum: [false],
                    },
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
        eventHandlerPrefix?: string | false;
        eventHandlerPropPrefix?: string | false;
        checkLocalVariables?: boolean;
        checkInlineFunction?: boolean;
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
            badHandlerName:
                "Handler function for {{propKey}} prop key must be a camelCase name beginning with '{{handlerPrefix}}' only",
            badPropKey: "Prop key for {{propValue}} must begin with '{{handlerPropPrefix}}'",
        },
    },
    create(context, [{ checkInlineFunction, checkLocalVariables, eventHandlerPrefix, eventHandlerPropPrefix }]) {
        const checkEventHandlerPrefix = !!eventHandlerPrefix;
        const checkEventHandlerPropPrefix = !!eventHandlerPropPrefix;

        const handlerPrefix = eventHandlerPrefix || "handle";
        const handlerPropPrefix = eventHandlerPropPrefix || "on";

        const EVENT_HANDLER_REGEX = new RegExp(
            `^((props\\.${handlerPropPrefix})|((.*\\.)?${handlerPrefix}))[0-9]*[A-Z].*$`,
        );
        const PROP_EVENT_HANDLER_REGEX = new RegExp(`^(${handlerPropPrefix}[A-Z].*|ref)$`);

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

                // Early return if the prop key a ref.
                if (propKey === "ref") {
                    return;
                }

                const propIsEventHandler = checkEventHandlerPropPrefix && PROP_EVENT_HANDLER_REGEX.test(propKey);
                const propFnIsNamedCorrectly = checkEventHandlerPrefix && EVENT_HANDLER_REGEX.test(propValue);

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

                if (!propIsEventHandler && propFnIsNamedCorrectly) {
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
