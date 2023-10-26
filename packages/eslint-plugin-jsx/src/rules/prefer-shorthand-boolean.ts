import { NodeType } from "@eslint-react/ast";
import { getPropName } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-boolean";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce boolean attributes notation in JSX",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Omit boolean value for prop '{{propName}}'.",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXAttribute(node) {
                const { value } = node;
                const propName = getPropName(node);

                const hasValueTrue = value?.type === NodeType.JSXExpressionContainer
                    && value.expression.type === NodeType.Literal
                    && value.expression.value === true;

                if (!hasValueTrue) {
                    return;
                }

                context.report({
                    data: {
                        propName,
                    },
                    messageId: "INVALID",
                    node,
                });
            },
        };
    },
});
