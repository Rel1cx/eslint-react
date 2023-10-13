import { isOneOf } from "@eslint-react/ast";
import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "jsx/no-misused-comment-in-textnode";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow comments from being inserted as text nodes",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID:
                "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces",
        },
    },
    defaultOptions: [],
    create(context) {
        function checkText(node: TSESTree.JSXText | TSESTree.Literal) {
            if (isOneOf([N.JSXAttribute, N.JSXExpressionContainer])(node.parent)) {
                return false;
            }

            const rawValue = context.getSourceCode().getText(node);

            return /^\s*\/(\/|\*)/mu.test(rawValue) && node.parent.type.includes("JSX");
        }

        const check = (node: TSESTree.JSXText | TSESTree.Literal) => {
            if (!isOneOf([N.JSXElement, N.JSXFragment])(node.parent)) {
                return;
            }

            if (checkText(node)) {
                context.report({
                    messageId: "INVALID",
                    node,
                });
            }
        };

        return {
            JSXText: check,
            Literal: check,
        };
    },
});
