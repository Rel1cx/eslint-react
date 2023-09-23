/* eslint-disable unicorn/consistent-function-scoping */
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { F, O } from "../lib/primitives/data";
import { AST } from "../utils/ast";
import { isCreateElement } from "../utils/is-create-element";
import { findPropInAttributes, findPropInProperties, isLineBreak } from "../utils/jsx";
import { findVariableByNameUpToGlobal } from "../utils/variable";

export const RULE_NAME = "no-unstable-default-props";

type MessageID = "DANGER_WITH_CHILDREN";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow when a DOM element is using both children and dangerouslySetInnerHTML'",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            DANGER_WITH_CHILDREN: "Only set one of `children` or `dangerouslySetInnerHTML`.",
        },
    },
    defaultOptions,
    create(context) {
        return {
            CallExpression(node) {
                if (node.arguments.length < 2 || !isCreateElement(node, context)) {
                    return;
                }
                const props = node.arguments[1];
                const properties = match(props)
                    .when(AST.isOneOf([N.ObjectExpression, N.ObjectPattern]), (n) => {
                        return "properties" in n ? n.properties : [];
                    })
                    .when(AST.is(N.Identifier), (n) => {
                        return F.pipe(
                            findVariableByNameUpToGlobal(n.name, context.getScope()),
                            O.flatMapNullable((v) => v.defs.at(0)),
                            O.flatMapNullable((d) => d.node),
                            O.flatMapNullable((n) => ("init" in n ? n.init : null)),
                            O.flatMapNullable((n) => ("properties" in n ? n.properties : null)),
                            O.getOrElse(() => []),
                        );
                    })
                    .otherwise(() => []);

                const hasDanger = O.isSome(findPropInProperties(properties, context)("dangerouslySetInnerHTML"));

                const hasRestChildren = node.arguments.length > 2;

                if (hasDanger && (hasRestChildren || O.isSome(findPropInProperties(properties, context)("children")))) {
                    context.report({
                        messageId: "DANGER_WITH_CHILDREN",
                        node,
                    });
                }
            },
            JSXElement(node) {
                function firstChildIsText(node: TSESTree.JSXElement) {
                    const firstChild = node.children[0];

                    return node.children.length > 0 && firstChild && !isLineBreak(firstChild);
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
                        messageId: "DANGER_WITH_CHILDREN",
                        node,
                    });
                }
            },
        };
    },
});
