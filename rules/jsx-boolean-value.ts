import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { I, O } from "../lib/data";
import { Applicability } from "../typings";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = "jsx-boolean-value";

type MessageIds = "omitBoolean" | "setBoolean";

type Options = readonly [Applicability?, { [Applicability.always]?: string[]; [Applicability.never]?: string[] }?];

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
                    enum: [Applicability.always],
                },
                {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        [Applicability.never]: {
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
                        [Applicability.always]: {
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
    create(context) {
        const [configuration = Applicability.never, configObject = {}] = context.options;

        const configExceptions =
            configuration === Applicability.always ? configObject.never : configObject.always || [];

        const exceptions = new Set(configExceptions);

        return {
            JSXAttribute(node) {
                const { name, value } = node;
                const propName = I.isString(name.name) ? name.name : name.name.name;

                const isException = exceptions.has(propName);
                const maybeMessageId = match(configuration)
                    .with(Applicability.always, () => {
                        const hasValue = I.isNullable(value);

                        if (hasValue && !isException) {
                            return O.some<MessageIds>("setBoolean");
                        }

                        if (!hasValue && isException) {
                            return O.some<MessageIds>("omitBoolean");
                        }

                        return O.none();
                    })
                    .with(Applicability.never, () => {
                        const hasValueWithTrue =
                            node.value?.type === AST_NODE_TYPES.JSXExpressionContainer &&
                            node.value.expression.type === AST_NODE_TYPES.Literal &&
                            node.value.expression.value === true;

                        if (hasValueWithTrue && !isException) {
                            return O.some<MessageIds>("omitBoolean");
                        }

                        if (!hasValueWithTrue && isException) {
                            return O.some<MessageIds>("setBoolean");
                        }

                        return O.none();
                    })
                    .exhaustive();

                if (O.isSome(maybeMessageId)) {
                    return context.report({
                        data: { propName },
                        messageId: maybeMessageId.value,
                        node,
                    });
                }
            },
        };
    },
    defaultOptions,
});
