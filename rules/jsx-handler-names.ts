/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { isMatching, P } from "ts-pattern";

import { I } from "../lib/data";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = "jsx-handler-names";

type MessageIds = "badHandlerName" | "badPropKey";

const schema: JSONSchema4 = {
    type: "object",
    additionalProperties: false,
    properties: {
        checkInlineFunction: { type: "boolean" },
        checkLocalVariables: { type: "boolean" },
        eventHandlerPrefix: { type: "string" },
        eventHandlerPropPrefix: { type: "string" },
    },
};

type Options = readonly [
    {
        checkInlineFunction: boolean;
        checkLocalVariables: boolean;
        eventHandlerPrefix: string;
        eventHandlerPropPrefix: string;
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
                "Handler function `{{ propKey }}` should be named `{{ handlerPrefix }}{{ propKey }}`",
            badPropKey:
                "Prop `{{ propValue }}` should be named `{{ handlerPropPrefix }}{{ propValue }}`",
        },
    },
    create(
        context,
        [
            {
                checkInlineFunction,
                // checkLocalVariables,
                eventHandlerPrefix,
                eventHandlerPropPrefix,
            },
        ],
    ) {
        return {
            JSXAttribute(node) {
                if (!isMatching({ expression: P.not(P.nullish) }, node.value)) {
                    return;
                }

                const propKey = I.isObject(node.name)
                    ? node.name.name
                    : node.name;
                const expression = node.value?.expression;

                const propValue = context
                    .getSourceCode()
                    .getText(
                        checkInlineFunction &&
                            "body" in expression &&
                            "callee" in expression.body
                            ? expression.body.callee
                            : expression,
                    )
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
