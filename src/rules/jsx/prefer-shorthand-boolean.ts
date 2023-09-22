import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { createEslintRule } from "../../../tools/create-eslint-rule";
import { type Cond } from "../../../typings";
import { I, O } from "../../lib/primitives/data";

export const RULE_NAME = "jsx/prefer-shorthand-boolean";

type MessageID = "OMIT_VALUE" | "SET_VALUE";

type Options = readonly [
    {
        excepts?: readonly string[];
        rule?: Cond;
    }?,
];

const defaultOptions = [
    {
        excepts: [],
        rule: "never",
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
                default: "never",
                enum: ["always", "never"],
            },
        },
    },
] satisfies [JSONSchema4];

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce boolean attributes notation in JSX",
            recommended: "recommended",
        },
        schema,
        messages: {
            OMIT_VALUE: "Omit boolean value for prop '{{propName}}'.",
            SET_VALUE: "Set boolean value for prop '{{propName}}'.",
        },
    },
    defaultOptions,
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
                const maybeMessageId = match<Cond, O.Option<MessageID>>(rule)
                    .with("always", () => {
                        const hasValue = I.isNullable(value);

                        if (hasValue && !isException) {
                            return O.some("SET_VALUE");
                        }

                        if (!hasValue && isException) {
                            return O.some("OMIT_VALUE");
                        }

                        return O.none();
                    })
                    .with("never", () => {
                        const hasValueWithTrue = value?.type === AST_NODE_TYPES.JSXExpressionContainer
                            && value.expression.type === AST_NODE_TYPES.Literal
                            && value.expression.value === true;

                        if (hasValueWithTrue && !isException) {
                            return O.some("OMIT_VALUE");
                        }

                        if (!hasValueWithTrue && isException) {
                            return O.some("SET_VALUE");
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
});
