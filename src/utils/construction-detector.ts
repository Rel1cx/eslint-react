import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { isNil, isObject, isString, O } from "../lib/primitives";
import * as AST from "./ast";

export type ConstructionDetail = Readonly<
    | {
        type: "NONE";
    }
    // eslint-disable-next-line perfectionist/sort-union-types
    | {
        type: "ARRAY";
        node: TSESTree.ArrayExpression;
    }
    | {
        type: "ASSIGNMENT_EXPRESSION";
        node: TSESTree.Node;
        usage: TSESTree.Node;
    }
    | {
        type: "CLASS_EXPRESSION";
        node: TSESTree.ClassExpression;
    }
    | {
        type: "FUNCTION_DECLARATION";
        node: TSESTree.FunctionDeclaration;
        usage: TSESTree.Expression | TSESTree.Identifier;
    }
    | {
        type: "FUNCTION_EXPRESSION";
        node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;
    }
    | {
        type: "JSX_ELEMENT";
        node: TSESTree.JSXElement;
    }
    | {
        type: "JSX_FRAGMENT";
        node: TSESTree.JSXFragment;
    }
    | {
        type: "NEW_EXPRESSION";
        node: TSESTree.NewExpression;
    }
    | {
        type: "OBJECT_EXPRESSION";
        node: TSESTree.ObjectExpression;
    }
    | {
        type: "REGULAR_EXPRESSION";
        node: TSESTree.Literal;
    }
>;

const none = { type: "NONE" } as const satisfies ConstructionDetail;

/**
 * Detect the construction type of a node
 * @internal
 * @param context The rule context
 */
export function make<T extends RuleContext>(context: T) {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const detect = (node: TSESTree.Node, scope = context.getScope()): ConstructionDetail => {
        return match<TSESTree.Node, ConstructionDetail>(node)
            .when(AST.is(N.ArrayExpression), (node) => ({ type: "ARRAY", node }))
            .when(AST.is(N.ObjectExpression), (node) => ({ type: "OBJECT_EXPRESSION", node }))
            .when(AST.is(N.ClassExpression), (node) => ({ type: "CLASS_EXPRESSION", node }))
            .when(AST.is(N.FunctionExpression), (node) => ({ type: "FUNCTION_EXPRESSION", node }))
            .when(AST.is(N.JSXElement), (node) => ({ type: "JSX_ELEMENT", node }))
            .when(AST.is(N.JSXFragment), (node) => ({ type: "JSX_FRAGMENT", node }))
            .when(AST.is(N.NewExpression), (node) => ({ type: "NEW_EXPRESSION", node }))
            .when(AST.is(N.ArrowFunctionExpression), (node) => ({ type: "FUNCTION_EXPRESSION", node }))
            .when(AST.is(N.MemberExpression), (node) => {
                if (!("object" in node)) {
                    return none;
                }

                const object = detect(node.object);

                if (object.type === "NONE") {
                    return object;
                }

                return {
                    ...object,
                    usage: node.object,
                } as const;
            })
            .when(AST.is(N.AssignmentExpression), (node) => {
                if (!("right" in node)) {
                    return none;
                }

                const right = detect(node.right);

                if (right.type === "NONE") {
                    return right;
                }

                return {
                    type: "ASSIGNMENT_EXPRESSION",
                    node: right.node,
                    usage: node,
                };
            })
            .when(AST.is(N.LogicalExpression), (node) => {
                if (!("left" in node && "right" in node)) {
                    return none;
                }

                const left = detect(node.left);

                if (left.type === "NONE") {
                    return left;
                }

                return detect(node.right);
            })
            .when(AST.is(N.ConditionalExpression), (node) => {
                if (!("consequent" in node && "alternate" in node && !isNil(node.alternate))) {
                    return none;
                }

                const consequent = detect(node.consequent);

                if (consequent.type === "NONE") {
                    return consequent;
                }

                return detect(node.alternate);
            })
            .when(AST.is(N.Identifier), (node) => {
                if (!("name" in node && isString(node.name))) {
                    return none;
                }

                const maybeLatestDef = O.fromNullable(scope.set.get(node.name)?.defs.at(-1));

                if (O.isNone(maybeLatestDef)) {
                    return none;
                }

                const latestDef = maybeLatestDef.value;

                if (latestDef.type !== DefinitionType.Variable && latestDef.type !== DefinitionType.FunctionName) {
                    return none;
                }

                if (latestDef.node.type === N.FunctionDeclaration) {
                    return {
                        type: "FUNCTION_DECLARATION",
                        node: latestDef.node,
                        usage: node,
                    };
                }

                if (!("init" in latestDef.node) || latestDef.node.init === null) {
                    return none;
                }

                return detect(latestDef.node.init);
            })
            .when(AST.is(N.Literal), (node) => {
                if ("regex" in node) {
                    return { type: "REGULAR_EXPRESSION", node };
                }

                return none;
            })
            .when(AST.isOneOf([N.TSAsExpression, N.TSTypeAssertion]), () => {
                if (!("expression" in node) || !isObject(node.expression)) {
                    return none;
                }

                return detect(node.expression);
            })
            .otherwise(() => none);
    };

    return detect;
}
