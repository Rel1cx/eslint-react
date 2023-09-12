import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { type RuleName } from "../../typings";
import { Cond } from "../../typings/rule-option";
import { I, O } from "../lib/primitives/data";
import { Enum } from "../lib/primitives/enum";

const RULE_NAME: RuleName = "prefer-shorthand-jsx-boolean";

const MessageID = Enum("OMIT_VALUE", "SET_VALUE");

type MessageID = Enum<typeof MessageID>;

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
                default: Cond.never,
                enum: [Cond.always, Cond.never],
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
            [MessageID.OMIT_VALUE]: "Omit boolean value for prop '{{propName}}'.",
            [MessageID.SET_VALUE]: "Set boolean value for prop '{{propName}}'.",
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

                const maybeMessageId = match(rule)
                    .with(Cond.always, () => {
                        const hasValue = I.isNullable(value);

                        if (hasValue && !isException) {
                            return O.some(MessageID.SET_VALUE);
                        }

                        if (!hasValue && isException) {
                            return O.some(MessageID.OMIT_VALUE);
                        }

                        return O.none();
                    })
                    .with(Cond.never, () => {
                        const hasValueWithTrue =
                            value?.type === AST_NODE_TYPES.JSXExpressionContainer &&
                            value.expression.type === AST_NODE_TYPES.Literal &&
                            value.expression.value === true;

                        if (hasValueWithTrue && !isException) {
                            return O.some(MessageID.OMIT_VALUE);
                        }

                        if (!hasValueWithTrue && isException) {
                            return O.some(MessageID.SET_VALUE);
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
