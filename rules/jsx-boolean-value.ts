import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { I, O } from "../primitives/data";
import { createEslintRule } from "../tools/create-eslint-rule";
import { Applicability } from "../types";

export const RULE_NAME = "jsx-boolean-value";

type MessageIds = "omitBoolean" | "setBoolean";

type Options = [Applicability?, { [Applicability.always]?: string[]; [Applicability.never]?: string[] }?];

const schema = {
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
} satisfies JSONSchema4;

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

        const maybeExceptions = O.fromNullable(
            match(configuration)
                .with(Applicability.always, () => configObject.never)
                .with(Applicability.never, () => configObject.always)
                .exhaustive(),
        );

        const exceptions = new Set(O.getOrElse(() => [])(maybeExceptions));

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
