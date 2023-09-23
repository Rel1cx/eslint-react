import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { Data, F, I, O } from "../lib/primitives";
import { AST } from "./ast";

export type ConstructionType = Data.TaggedEnum<{
    NONE: {};
    // eslint-disable-next-line perfectionist/sort-object-types
    ARRAY: {
        name: "array";
        node: TSESTree.ArrayExpression;
    };
    ASSIGNMENT_EXPRESSION: {
        name: "assignment expression";
        node: TSESTree.Node;
        usage: TSESTree.Node;
    };
    CLASS_EXPRESSION: {
        name: "class expression";
        node: TSESTree.ClassExpression;
    };
    FUNCTION_DECLARATION: {
        name: "function declaration";
        node: TSESTree.FunctionDeclaration;
        usage: TSESTree.Expression | TSESTree.Identifier;
    };
    FUNCTION_EXPRESSION: {
        name: "function expression";
        node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;
    };
    JSX_ELEMENT: {
        name: "JSX element";
        node: TSESTree.JSXElement;
    };
    JSX_FRAGMENT: {
        name: "JSX fragment";
        node: TSESTree.JSXFragment;
    };
    NEW_EXPRESSION: {
        name: "new expression";
        node: TSESTree.NewExpression;
    };
    OBJECT_EXPRESSION: {
        name: "object";
        node: TSESTree.ObjectExpression;
    };
    REGULAR_EXPRESSION: {
        name: "regular expression";
        node: TSESTree.Literal;
    };
}>;

export const ConstructionType = Data.taggedEnum<ConstructionType>();

const None = ConstructionType("NONE")();

export function make<T extends RuleContext>(context: T) {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const detect = (node: TSESTree.Node, scope = context.getScope()): ConstructionType => {
        return match(node)
            .when(AST.is(N.ArrayExpression), (node) => ConstructionType("ARRAY")({ name: "array", node }))
            .when(AST.is(N.ObjectExpression), (node) => ConstructionType("OBJECT_EXPRESSION")({ name: "object", node }))
            .when(AST.is(N.ClassExpression), (node) => ConstructionType("CLASS_EXPRESSION")({ name: "class expression", node }))
            .when(
                AST.is(N.FunctionExpression),
                (node) => ConstructionType("FUNCTION_EXPRESSION")({ name: "function expression", node }),
            )
            .when(AST.is(N.JSXElement), (node) => ConstructionType("JSX_ELEMENT")({ name: "JSX element", node }))
            .when(AST.is(N.JSXFragment), (node) => ConstructionType("JSX_FRAGMENT")({ name: "JSX fragment", node }))
            .when(AST.is(N.NewExpression), (node) => ConstructionType("NEW_EXPRESSION")({ name: "new expression", node }))
            .when(
                AST.is(N.ArrowFunctionExpression),
                (node) => ConstructionType("FUNCTION_EXPRESSION")({ name: "function expression", node }),
            )
            .when(AST.is(N.MemberExpression), (node) => {
                if (!("object" in node)) {
                    return None;
                }

                const object = detect(node.object);

                if (object._tag === "NONE") {
                    return object;
                }

                return {
                    ...object,
                    usage: node.object,
                };
            })
            .when(AST.is(N.AssignmentExpression), (node) => {
                if (!("right" in node)) {
                    return None;
                }

                const right = detect(node.right);

                if (right._tag === "NONE") {
                    return right;
                }

                return ConstructionType("ASSIGNMENT_EXPRESSION")({
                    name: "assignment expression",
                    node: right.node,
                    usage: node,
                });
            })
            .when(AST.is(N.LogicalExpression), (node) => {
                if (!("left" in node && "right" in node)) {
                    return None;
                }

                const left = detect(node.left);

                if (left._tag === "NONE") {
                    return left;
                }

                return detect(node.right);
            })
            .when(AST.is(N.ConditionalExpression), (node) => {
                if (!("consequent" in node && "alternate" in node && !I.isNullable(node.alternate))) {
                    return None;
                }

                const consequent = detect(node.consequent);

                if (consequent._tag === "NONE") {
                    return consequent;
                }

                return detect(node.alternate);
            })
            .when(AST.is(N.Identifier), (node) => {
                if (!("name" in node && I.isString(node.name))) {
                    return None;
                }

                const maybeLatestDef = F.pipe(
                    scope.set.get(node.name),
                    O.fromNullable,
                    O.flatMapNullable((v) => v.defs.at(-1)),
                );

                if (O.isNone(maybeLatestDef)) {
                    return None;
                }

                const latestDef = maybeLatestDef.value;

                if (latestDef.type !== DefinitionType.Variable && latestDef.type !== DefinitionType.FunctionName) {
                    return None;
                }

                if (AST.is(N.FunctionDeclaration)(latestDef.node)) {
                    return ConstructionType("FUNCTION_DECLARATION")({
                        name: "function declaration",
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
                    return ConstructionType("REGULAR_EXPRESSION")({ name: "regular expression", node });
                }

                return None;
            })
            .when(AST.isOneOf([N.TSAsExpression, N.TSTypeAssertion]), () => {
                if (!("expression" in node) || !I.isObject(node.expression)) {
                    return None;
                }

                return detect(node.expression);
            })
            .otherwise(() => None);
    };

    return detect;
}
