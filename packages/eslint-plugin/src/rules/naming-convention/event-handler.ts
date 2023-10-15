/* eslint-disable security/detect-non-literal-regexp */
import { NodeType } from "@eslint-react/ast";
import { getPropName } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule } from "../../utils";

export const RULE_NAME = "naming-convention/event-handler";

type MessageID = "BAD_HANDLER_NAME" | "BAD_PROP_NAME";

type Options = readonly [
    {
        checkInlineFunction?: boolean;
        checkLocalVariables?: boolean;
        handlerPrefix?: string;
        propPrefix?: string;
    },
];

const defaultOptions = [
    {
        checkInlineFunction: false,
        checkLocalVariables: false,
        handlerPrefix: "handle",
        propPrefix: "on",
    },
] as const satisfies Options;

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            checkInlineFunction: { type: "boolean" },
            checkLocalVariables: { type: "boolean" },
            handlerPrefix: { type: "string" },
            propPrefix: { type: "string" },
        },
    },
] satisfies JSONSchema4[];

export default createRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce event handler naming conventions in JSX",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema,
        messages: {
            BAD_HANDLER_NAME:
                "Handler function for `{{propKey}}` prop key must be a camelCase name beginning with `{{hPrefix}}` only",
            BAD_PROP_NAME: "Prop key for `{{propValue}}` must begin with `{{pPrefix}}`",
        },
    },
    defaultOptions,
    create(context, [{ checkInlineFunction, checkLocalVariables, handlerPrefix, propPrefix }]) {
        const checkHandlerPrefix = !!handlerPrefix && handlerPrefix !== "*";
        const checkPropPrefix = !!propPrefix && propPrefix !== "*";
        const hPrefix = checkHandlerPrefix ? handlerPrefix : "handle";
        const pPrefix = checkPropPrefix ? propPrefix : "on";
        const reEventProp = new RegExp(`^(${pPrefix}[A-Z].*|ref)$`, "u");
        // dprint-ignore
        const reEventHandler = new RegExp(`^((props\\.${pPrefix || ""})|((.*\\.)?${hPrefix}))[0-9]*[A-Z].*$`, "u");

        return {
            JSXAttribute(node) {
                // Early return if the attribute is not an event handler.
                if (!node.value || !("expression" in node.value)) {
                    return;
                }

                const { expression } = node.value;
                const isInlineFunction = expression.type === NodeType.ArrowFunctionExpression;

                // Early return when not checking inline functions but the expression is an inline function.

                if (!checkInlineFunction && isInlineFunction) {
                    return;
                }

                const maybeInnerFunction = "body" in expression && "callee" in expression.body
                    ? O.fromNullable(expression.body.callee)
                    : O.none();
                const onlyLocalVariables = isInlineFunction ? O.isNone(maybeInnerFunction) : !("object" in expression);

                // Early return when not checking local variables but the expression is a local variable.

                if (!checkLocalVariables && onlyLocalVariables) {
                    return;
                }

                const propKey = getPropName(node);
                const propValueNode = O.getOrElse(() => expression)(maybeInnerFunction);
                const propValue = context
                    .getSourceCode()
                    .getText(propValueNode)
                    .replaceAll(/\s*/gu, "")
                    .replace(/^this\.|.*::/u, "");

                // Early return if the prop key a ref.
                if (propKey === "ref") {
                    return;
                }

                const propIsEventHandler = reEventProp.test(propKey);
                const fnIsNamedOk = reEventHandler.test(propValue);
                if (checkPropPrefix && !propIsEventHandler && fnIsNamedOk) {
                    context.report({
                        data: {
                            pPrefix,
                            propValue,
                        },
                        messageId: "BAD_PROP_NAME",
                        node,
                    });
                }
                if (checkHandlerPrefix && propIsEventHandler && !fnIsNamedOk) {
                    context.report({
                        data: {
                            hPrefix,
                            propKey,
                        },
                        messageId: "BAD_HANDLER_NAME",
                        node,
                    });
                }
            },
        };
    },
});
