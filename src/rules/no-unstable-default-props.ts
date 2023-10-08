import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import * as ComponentCollector from "../utils/component-collector";
import { isUnstableAssignmentPattern } from "../utils/is-unstable-assignment-pattern";
import { readableNodeType } from "../utils/readable-node-type";

export const RULE_NAME = "no-unstable-default-props";

type MessageID = "INVALID";

function hasUsedObjectDestructuringSyntax(params: TSESTree.FunctionExpression["params"]): params is [TSESTree.ObjectPattern] {
    if (params.length !== 1) {
        return false;
    }
    const [param] = params;

    return param?.type === N.ObjectPattern;
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
        const { ctx, listeners } = ComponentCollector.make(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const component of components) {
                    const { params } = component;
                    if (!hasUsedObjectDestructuringSyntax(params)) {
                        continue;
                    }

                    const [{ properties }] = params;
                    for (const prop of properties) {
                        if (prop.type !== N.Property || prop.value.type !== N.AssignmentPattern) {
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
