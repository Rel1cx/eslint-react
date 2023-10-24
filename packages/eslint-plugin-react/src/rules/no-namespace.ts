import { isCreateElement } from "@eslint-react/create-element";
import { elementType } from "@eslint-react/jsx";
import { createRule } from "@eslint-react/shared";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export const RULE_NAME = "no-namespace";

type MessageID = "NO_NAMESPACE";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "enforce that namespaces are not used in React elements",
        },
        schema: [],
        messages: {
            NO_NAMESPACE: "React component {{name}} must not be in a namespace, as React does not support them",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if (
                    isCreateElement(node, context) && node.arguments.length > 0
                    && node.arguments[0]?.type === AST_NODE_TYPES.Literal
                ) {
                    const name = node.arguments[0].value;
                    if (typeof name !== "string" || !name.includes(":")) {
                        return;
                    }
                    context.report({
                        data: {
                            name,
                        },
                        messageId: "NO_NAMESPACE",
                        node,
                    });
                }
            },
            JSXOpeningElement(node) {
                const name = elementType(node);
                if (typeof name !== "string" || !name.includes(":")) {
                    return;
                }
                context.report({
                    data: {
                        name,
                    },
                    messageId: "NO_NAMESPACE",
                    node,
                });
            },
        };
    },
});
