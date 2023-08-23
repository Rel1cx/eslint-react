import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";
import type { ReadonlyDeep } from "type-fest";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { Applicability } from "../../typings";
import { I, O } from "../lib/primitives/data";

type MessageIds = "omitBoolean" | "setBoolean";

type Options = ReadonlyDeep<
    [
        {
            excepts?: string[];
            rule?: Applicability;
        }?,
    ]
>;

const defaultOptions = [
    {
        excepts: [],
        rule: Applicability.never,
    },
] as const satisfies Options;

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            excepts: {
                type: "array",
                default: ["index"],
                items: { type: "string" },
            },
            rule: {
                type: "string",
                default: Applicability.never,
                enum: [Applicability.always, Applicability.never],
            },
        },
    },
] satisfies [JSONSchema4];

export default createEslintRule<Options, MessageIds>({
    name: "jsx-boolean-value",
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
        const [option] = context.options;
        const [defaultOption] = defaultOptions;

        const rule = option?.rule ?? defaultOption.rule;
        const excepts = new Set(option?.excepts ?? defaultOption.excepts);

        return {
            JSXAttribute(node) {
                const { name, value } = node;
                const propName = I.isString(name.name) ? name.name : name.name.name;

                const isException = excepts.has(propName);

                const maybeMessageId = match(rule)
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
