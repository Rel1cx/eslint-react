/* eslint-disable unicorn/consistent-function-scoping */
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createRule } from "../../tools/create-rule";
import { F, O } from "../lib/primitives";
import * as AST from "../utils/ast";
import { isCreateElement } from "../utils/is-create-element";
import { findPropInAttributes, findPropInProperties } from "../utils/jsx";
import { findVariableByNameUpToGlobal, getVariableNthDefNodeInit } from "../utils/variable";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow when a DOM element is using both children and dangerouslySetInnerHTML'",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID: "Only set one of `children` or `dangerouslySetInnerHTML`.",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if (node.arguments.length < 2 || !isCreateElement(node, context)) {
                    return;
                }
                const props = node.arguments[1];
                const maybeProperties = match(props)
                    .when(AST.isOneOf([N.ObjectExpression, N.ObjectPattern]), (n) => {
                        return "properties" in n ? O.some(n.properties) : O.none();
                    })
                    .when(AST.is(N.Identifier), (n) => {
                        return F.pipe(
                            findVariableByNameUpToGlobal(n.name, context.getScope()),
                            O.flatMap(getVariableNthDefNodeInit(0)),
                            O.flatMapNullable((n) => ("properties" in n ? n.properties : null)),
                        );
                    })
                    .otherwise(O.none);

                if (O.isNone(maybeProperties)) {
                    return;
                }

                const properties = maybeProperties.value;

                const hasDanger = O.isSome(findPropInProperties(properties, context)("dangerouslySetInnerHTML"));

                const hasRestChildren = node.arguments.length > 2;

                if (hasDanger && (hasRestChildren || O.isSome(findPropInProperties(properties, context)("children")))) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
            JSXElement(node) {
                function firstChildIsText(node: TSESTree.JSXElement) {
                    const [firstChild] = node.children;

                    return node.children.length > 0 && firstChild && !AST.isLineBreak(firstChild);
                }

                function hasChildren(node: TSESTree.JSXElement) {
                    return (
                        firstChildIsText(node)
                        || O.isSome(findPropInAttributes(node.openingElement.attributes, context)("children"))
                    );
                }

                function hasDanger(node: TSESTree.JSXElement) {
                    return O.isSome(
                        findPropInAttributes(node.openingElement.attributes, context)("dangerouslySetInnerHTML"),
                    );
                }

                if (hasChildren(node) && hasDanger(node)) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
        };
    },
});
