import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { isNil, isObject, isString, O } from "../lib/primitives";
import { Data } from "../lib/primitives";
import * as AST from "./ast";

export type Construction = Data.TaggedEnum<{
    None: {};
    Array: {
        node: TSESTree.ArrayExpression;
        usage?: TSESTree.Node;
    };
    AssignmentExpression: {
        node: TSESTree.Node;
        usage: TSESTree.Node;
    };
    ClassExpression: {
        node: TSESTree.ClassExpression;
        usage?: TSESTree.Node;
    };
    FunctionDeclaration: {
        node: TSESTree.FunctionDeclaration;
        usage: TSESTree.Expression | TSESTree.Identifier;
    };
    FunctionExpression: {
        node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;
        usage?: TSESTree.Node;
    };
    JSXElement: {
        node: TSESTree.JSXElement;
        usage?: TSESTree.Node;
    };
    JSXFragment: {
        node: TSESTree.JSXFragment;
        usage?: TSESTree.Node;
    };
    NewExpression: {
        node: TSESTree.NewExpression;
        usage?: TSESTree.Node;
    };
    ObjectExpression: {
        node: TSESTree.ObjectExpression;
        usage?: TSESTree.Node;
    };
    RegExpLiteral: {
        node: TSESTree.Literal;
        usage?: TSESTree.Node;
    };
}>;

export const Construction = Data.taggedEnum<Construction>();

const None = Construction("None")();

/**
 * Detect the construction of a given node.
 * @internal
 * @param context The rule context
 */
export function make<T extends RuleContext>(context: T) {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const detect = (node: TSESTree.Node, scope = context.getScope()): Construction => {
        return match(node)
            .when(AST.is(N.ArrayExpression), (node) => Construction("Array")({ node }))
            .when(AST.is(N.ObjectExpression), (node) => Construction("ObjectExpression")({ node }))
            .when(AST.is(N.ClassExpression), (node) => Construction("ClassExpression")({ node }))
            .when(AST.is(N.JSXElement), (node) => Construction("JSXElement")({ node }))
            .when(AST.is(N.JSXFragment), (node) => Construction("JSXFragment")({ node }))
            .when(AST.is(N.NewExpression), (node) => Construction("NewExpression")({ node }))
            .when(AST.isOneOf([N.FunctionExpression, N.ArrowFunctionExpression]), (node) => {
                return Construction("FunctionExpression")({ node });
            })
            .when(AST.is(N.MemberExpression), (node) => {
                if (!("object" in node)) {
                    return None;
                }

                const object = detect(node.object);

                if (object._tag === "None") {
                    return object;
                }

                return Construction(object._tag)({
                    ...object,
                    usage: node.object,
                });
            })
            .when(AST.is(N.AssignmentExpression), (node) => {
                if (!("right" in node)) {
                    return None;
                }

                const right = detect(node.right);

                if (right._tag === "None") {
                    return right;
                }

                return Construction("AssignmentExpression")({
                    node: right.node,
                    usage: node,
                });
            })
            .when(AST.is(N.LogicalExpression), (node) => {
                if (!("left" in node && "right" in node)) {
                    return None;
                }

                const left = detect(node.left);

                if (left._tag === "None") {
                    return None;
                }

                return detect(node.right);
            })
            .when(AST.is(N.ConditionalExpression), (node) => {
                if (!("consequent" in node && "alternate" in node && !isNil(node.alternate))) {
                    return None;
                }

                const consequent = detect(node.consequent);

                if (consequent._tag === "None") {
                    return None;
                }

                return detect(node.alternate);
            })
            .when(AST.is(N.Identifier), (node) => {
                if (!("name" in node && isString(node.name))) {
                    return None;
                }

                const maybeLatestDef = O.fromNullable(scope.set.get(node.name)?.defs.at(-1));

                if (O.isNone(maybeLatestDef)) {
                    return None;
                }

                const latestDef = maybeLatestDef.value;

                if (latestDef.type !== DefinitionType.Variable && latestDef.type !== DefinitionType.FunctionName) {
                    return None;
                }

                if (latestDef.node.type === N.FunctionDeclaration) {
                    return Construction("FunctionDeclaration")({
                        node: latestDef.node,
                        usage: node,
                    });
                }

                if (!("init" in latestDef.node) || latestDef.node.init === null) {
                    return None;
                }

                return detect(latestDef.node.init);
            })
            .when(AST.is(N.Literal), (node) => {
                if ("regex" in node) {
                    return Construction("RegExpLiteral")({ node });
                }

                return None;
            })
            .when(AST.isOneOf([N.TSAsExpression, N.TSTypeAssertion]), () => {
                if (!("expression" in node) || !isObject(node.expression)) {
                    return None;
                }

                return detect(node.expression);
            })
            .otherwise(() => None);
    };

    return detect;
}
