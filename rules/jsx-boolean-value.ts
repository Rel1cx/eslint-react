import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { I, O } from "../libs";
import { Applicability } from "../typings";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = "jsx-boolean-value";

type MessageIds = "omitBoolean" | "setBoolean";

type Options = readonly [
    Applicability,
    { [Applicability.always]?: string[]; [Applicability.never]?: string[] }?,
];

const schema: JSONSchema4 = {
    anyOf: [
        {
            type: "array",
            additionalItems: false,
            items: [
                {
                    type: "string",
                    enum: [Applicability.always, Applicability.never],
                },
            ],
        },
        {
            type: "array",
            additionalItems: false,
            items: [
                {
                    type: "string",
                    enum: [Applicability.always, Applicability.never],
                },
                {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        never: {
                            type: "array",
                            items: { type: "string", minLength: 1 },
                            uniqueItems: true,
                        },
                    },
                },
            ],
        },
        {
            type: "array",
            additionalItems: false,
            items: [
                {
                    type: "string",
                    enum: [Applicability.never],
                },
                {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        always: {
                            type: "array",
                            items: { type: "string", minLength: 1 },
                            uniqueItems: true,
                        },
                    },
                },
            ],
        },
    ],
};

const defaultOptions = [Applicability.never] satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce boolean attributes notation in JSX",
            recommended: "recommended",
        },
        schema,
        messages: {
            omitBoolean: "Omit boolean value for prop '{{propName}}'.",
            setBoolean: "Set boolean value for prop '{{propName}}'.",
        },
    },
    create(context, [configuration = Applicability.never, configObject = {}]) {
        const configExceptions =
            configuration === Applicability.always
                ? configObject.never
                : configObject.always || [];

        const exceptions = new Set(configExceptions);

        return {
            JSXAttribute(node) {
                const { name, value } = node;
                const propName = I.isString(name.name)
                    ? name.name
                    : name.name.name;
                const isException = exceptions.has(propName);

                if (isException) {
                    return;
                }

                const maybeMessageId = match(configuration)
                    .with(Applicability.always, () => {
                        return I.isNullable(value)
                            ? O.some<MessageIds>("setBoolean")
                            : O.none();
                    })
                    .with(Applicability.never, () => {
                        if (
                            node.value?.type ===
                                AST_NODE_TYPES.JSXExpressionContainer &&
                            node.value.expression.type ===
                                AST_NODE_TYPES.Literal &&
                            node.value.expression.value === true
                        ) {
                            return O.some<MessageIds>("omitBoolean");
                        }

                        return O.none();
                    })
                    .exhaustive();

                if (O.isSome(maybeMessageId)) {
                    const messageId = maybeMessageId.value;
                    context.report({ data: { propName }, messageId, node });
                }
            },
        };
    },
    defaultOptions,
});
