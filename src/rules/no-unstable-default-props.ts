import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createRule } from "../../tools/create-rule";
import { isNil } from "../lib/primitives";
import * as AST from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";
import { detectUnstableDefaultProp } from "../utils/unstable-default-prop-detector";

export const RULE_NAME = "no-unstable-default-props";

type MessageID = "INVALID";

function hasUsedObjectDestructuringSyntax(params: TSESTree.FunctionExpression["params"]): params is [TSESTree.ObjectPattern] {
    if (params.length !== 1) {
        return false;
    }
    const [param] = params;

    return !isNil(param) && AST.is(N.ObjectPattern)(param);
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
                        if (!AST.is(N.Property)(prop) || !AST.is(N.AssignmentPattern)(prop.value)) {
                            continue;
                        }

                        const [type, node] = detectUnstableDefaultProp(prop);

                        if (type === "NONE") {
                            continue;
                        }

                        const forbiddenType = match(type)
                            .with("JSX_ELEMENT", () => "JSX element")
                            .with("SYMBOL_LITERAL", () => "Symbol literal")
                            .otherwise(t => t.toLowerCase().replaceAll("_", " "));

                        context.report({
                            data: {
                                forbiddenType,
                            },
                            messageId: "INVALID",
                            node,
                        });
                    }
                }
            },
        };
    },
});
