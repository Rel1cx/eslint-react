import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { isMatching } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";

type MessageIds = "complexType" | "forbiddenValue" | "invalidValue" | "missingType";

type Options = [
    {
        button?: boolean;
        reset?: boolean;
        submit?: boolean;
    }?,
];

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            button: {
                type: "boolean",
            },
            reset: {
                type: "boolean",
            },
            submit: {
                type: "boolean",
            },
        },
    },
] satisfies [JSONSchema4];

const defaultOptions = [
    {
        button: true,
        reset: true,
        submit: true,
    },
] satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: "button-has-type",
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce that buttons have type attribute",
            recommended: "recommended",
        },
        schema,
        messages: {
            complexType:
                "The button type attribute must be specified by a static string or a trivial ternary expression",
            forbiddenValue: '"{{value}}" is an invalid value for button type attribute',
            invalidValue: '"{{value}}" is an invalid value for button type attribute',
            missingType: "Missing an explicit type attribute for button",
        },
    },
    create(context, [{ button = true, reset = true, submit = true } = {}]) {
        return {
            JSXElement(node) {
                const { openingElement } = node;
                if (!isMatching({ name: { name: "button" } })(openingElement)) {
                    return;
                }

                if (!("attributes" in openingElement)) {
                    // reportMissing(node);
                    return;
                }

                // TODO: implement the rest of this rule
                // const typeProp = getProp(openingElement.attributes, "type");
            },
        };
    },
    defaultOptions,
});
