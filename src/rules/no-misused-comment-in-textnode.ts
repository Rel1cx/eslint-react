import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { AST } from "../utils/ast";

const RULE_NAME: RuleName = "no-misused-comment-in-textnode";

type MessageID = "MISUSED_COMMENT_IN_TEXTNODE";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

function checkText(node: TSESTree.Literal | TSESTree.JSXText) {
    if (AST.isOneOf([AST_NODE_TYPES.JSXAttribute, AST_NODE_TYPES.JSXExpressionContainer])(node.parent)) {
        return false;
    }

    return /^\s*\/(\/|\*)/mu.test(node.raw) && node.parent.type.includes("JSX");
}

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow comments from being inserted as text nodes",
        },
        schema: [],
        messages: {
            MISUSED_COMMENT_IN_TEXTNODE:
                "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces",
        },
    },
    defaultOptions,
    create(context) {
        return {
            JSXText(node) {
                if (checkText(node)) {
                    context.report({
                        messageId: "MISUSED_COMMENT_IN_TEXTNODE",
                        node,
                    });
                }
            },
            Literal(node) {
                if (checkText(node)) {
                    context.report({
                        messageId: "MISUSED_COMMENT_IN_TEXTNODE",
                        node,
                    });
                }
            },
        };
    },
});
