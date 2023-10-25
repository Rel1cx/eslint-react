import { createRule } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export const RULE_NAME = "ensure-custom-hooks-using-other-hooks";

type MessageID = "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS";

function isHookFunctionName(name: string) {
    return name.startsWith("use") && name[3] === name[3]?.toUpperCase();
}

function isHook(node: TSESTree.Identifier) {
    if (
        !isHookFunctionName(node.name)
    ) {
        return false;
    }

    const { parent } = node;
    if (
        parent.type === AST_NODE_TYPES.VariableDeclarator
        && parent.init?.type === AST_NODE_TYPES.ArrowFunctionExpression
    ) {
        return true;
    }

    return parent.type === AST_NODE_TYPES.FunctionDeclaration;
}

function getAllCallExpressionName(
    node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration,
) {
    const result: string[] = [];

    const { body } = node;
    if (body.type === AST_NODE_TYPES.BlockStatement) {
        for (const statement of body.body) {
            if ("declarations" in statement) {
                for (const declaration of statement.declarations) {
                    if (
                        declaration.init?.type === AST_NODE_TYPES.CallExpression
                        && declaration.init.callee.type === AST_NODE_TYPES.Identifier
                    ) {
                        result.push(declaration.init.callee.name);
                    }
                }
            }
            if (
                "argument" in statement && statement.argument?.type === AST_NODE_TYPES.CallExpression
                && statement.argument.callee.type === AST_NODE_TYPES.Identifier
            ) {
                result.push(statement.argument.callee.name);
            }
        }
    }

    if (body.type === AST_NODE_TYPES.CallExpression && body.callee.type === AST_NODE_TYPES.Identifier) {
        result.push(body.callee.name);
    }

    return result;
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "enforce that custom hooks are using other hooks",
        },
        schema: [],
        messages: {
            ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS: "Custom hook {{name}} must use other hooks",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                if (node.parent.type === AST_NODE_TYPES.VariableDeclarator) {
                    const { id } = node.parent;
                    if (id.type === AST_NODE_TYPES.Identifier && isHook(id)) {
                        const callExpressions = getAllCallExpressionName(node);

                        if (callExpressions.every((name) => !isHookFunctionName(name))) {
                            context.report({
                                data: {
                                    name: id.name,
                                },
                                messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
                                node,
                            });
                        }
                    }
                }
            },
            FunctionDeclaration(node) {
                const { id } = node;
                if (
                    !(id?.type === AST_NODE_TYPES.Identifier
                        && isHook(id))
                ) {
                    return;
                }

                const callExpressions = getAllCallExpressionName(node);

                if (callExpressions.every((name) => !isHookFunctionName(name))) {
                    context.report({
                        data: {
                            name: id.name,
                        },
                        messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
                        node,
                    });
                }
            },
        };
    },
});
