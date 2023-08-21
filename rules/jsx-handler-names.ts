import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { I, O } from "../lib/data";
import { createEslintRule } from "../utils/create-eslint-rule";
import * as JSXHelper from "../utils/jsx-helper";

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
] satisfies readonly JSONSchema4[];

type Options = readonly [
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
                if (!node.value || !("expression" in node.value)) {
                    return;
                }

                const expression = node.value.expression;

                const maybeInnerExpression =
                    "body" in expression && "callee" in expression.body
                        ? O.fromNullable(expression.body.callee)
                        : O.none();

                const isInlineFunction = O.isSome(maybeInnerExpression);

                if (!checkInlineFunction && isInlineFunction) {
                    return;
                }

                const onlyLocalVariables = isInlineFunction
                    ? !Reflect.has(maybeInnerExpression.value, "object")
                    : !Reflect.has(expression, "object");

                if (!checkLocalVariables && onlyLocalVariables) {
                    return;
                }

                const propKey = JSXHelper.getPropKey(node.name);
                const propValueNode = checkInlineFunction && isInlineFunction ? maybeInnerExpression.value : expression;

                const propValue = context
                    .getSourceCode()
                    .getText(propValueNode)
                    .replace(/\s*/gu, "")
                    // eslint-disable-next-line regexp/no-super-linear-move
                    .replace(/^this\.|.*::/u, "");

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
