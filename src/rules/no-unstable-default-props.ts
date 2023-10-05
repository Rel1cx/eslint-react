import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import { astNodeToReadableName } from "../utils/ast-node-to-readable-name";
import * as ComponentCollector from "../utils/component-collector";
import { isStableExpression } from "../utils/is-stable-expression";

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
            description: "disallow usage of referential-type variables as default param in function component",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID:
                "found a/an {{forbiddenType}} as default prop. This could lead to potential infinite render loop in React. Use a variable reference instead of {{forbiddenType}}.",
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

                        if (isStableExpression(right)) {
                            continue;
                        }

                        const forbiddenType = right.type === N.CallExpression
                            ? "Symbol creation"
                            : astNodeToReadableName(right);

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
