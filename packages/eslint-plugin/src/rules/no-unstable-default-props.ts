import { NodeType, readableNodeType } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/component";
import { isUnstableAssignmentPattern } from "@eslint-react/construction";
import { E } from "@eslint-react/tools";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/create-rule";

export const RULE_NAME = "no-unstable-default-props";

type MessageID = "INVALID";

function hasUsedObjectDestructuringSyntax(params: TSESTree.FunctionExpression["params"]): params is [TSESTree.ObjectPattern] {
    if (params.length !== 1) {
        return false;
    }
    const [param] = params;

    return param?.type === NodeType.ObjectPattern;
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of unstable value as default param in function component",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID:
                "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable instead of {{forbiddenType}}.",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = componentCollector(context);

        return {
            ...listeners,
            "Program:exit"() {
                const maybeComponents = ctx.getAllComponents();
                if (E.isLeft(maybeComponents)) {
                    console.error(maybeComponents.left);

                    return;
                }
                const components = maybeComponents.right;
                for (const component of components) {
                    const { params } = component;
                    if (!hasUsedObjectDestructuringSyntax(params)) {
                        continue;
                    }
                    const [{ properties }] = params;
                    for (const prop of properties) {
                        if (prop.type !== NodeType.Property || prop.value.type !== NodeType.AssignmentPattern) {
                            continue;
                        }
                        const { value } = prop;
                        const { right } = value;
                        if (!isUnstableAssignmentPattern(value)) {
                            continue;
                        }
                        const forbiddenType = readableNodeType(right);
                        context.report({
                            data: {
                                forbiddenType,
                            },
                            messageId: "INVALID",
                            node: right,
                        });
                    }
                }
            },
        };
    },
});
