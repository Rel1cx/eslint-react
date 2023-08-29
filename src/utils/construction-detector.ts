import type { Scope } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { F, I, O } from "../lib/primitives/data";
import { Enum } from "../lib/primitives/enum";
import { AST } from "./ast";

export const ConstructionType = Enum(
    "OBJECT",
    "ARRAY",
    "FUNCTION_EXPRESSION",
    "CLASS_EXPRESSION",
    "NEW_EXPRESSION",
    "JSX_FRAGMENT",
    "JSX_ELEMENT",
    "REGULAR_EXPRESSION",
    "FUNCTION_DECLARATION",
    "ASSIGNMENT_EXPRESSION",
    "MEMBER_EXPRESSION",
);

export type ConstructionType = Enum<typeof ConstructionType>;

export function make(scope: Scope) {
    const detect = (
        node: TSESTree.Node,
    ): O.Option<{ node: TSESTree.Node; type: ConstructionType; usage?: TSESTree.Node }> => {
        return match(node.type)
            .with(AST_NODE_TYPES.ArrayExpression, () => O.some({ type: ConstructionType.ARRAY, node }))
            .with(AST_NODE_TYPES.ObjectExpression, () => O.some({ type: ConstructionType.OBJECT, node }))
            .with(AST_NODE_TYPES.ClassExpression, () => O.some({ type: ConstructionType.CLASS_EXPRESSION, node }))
            .with(AST_NODE_TYPES.JSXElement, () => O.some({ type: ConstructionType.JSX_ELEMENT, node }))
            .with(AST_NODE_TYPES.JSXFragment, () => O.some({ type: ConstructionType.JSX_FRAGMENT, node }))
            .with(AST_NODE_TYPES.NewExpression, () => O.some({ type: ConstructionType.NEW_EXPRESSION, node }))
            .with(AST_NODE_TYPES.FunctionExpression, () => O.some({ type: ConstructionType.FUNCTION_EXPRESSION, node }))
            .with(AST_NODE_TYPES.ArrowFunctionExpression, () => {
                return O.some({ type: ConstructionType.FUNCTION_EXPRESSION, node });
            })
            .with(AST_NODE_TYPES.MemberExpression, () => {
                if (!("object" in node)) {
                    return O.none();
                }

                return F.pipe(
                    detect(node.object),
                    O.map((construct) => ({
                        ...construct,
                        usage: node.object,
                    })),
                );
            })
            .with(AST_NODE_TYPES.AssignmentExpression, () => {
                if (!("right" in node)) {
                    return O.none();
                }

                return F.pipe(
                    detect(node.right),
                    O.map((construct) => ({
                        type: ConstructionType.ASSIGNMENT_EXPRESSION,
                        node: construct.node,
                        usage: node,
                    })),
                );
            })
            .with(AST_NODE_TYPES.LogicalExpression, () => {
                if (!("left" in node) || !("right" in node)) {
                    return O.none();
                }

                return F.pipe(
                    detect(node.left),
                    O.orElse(() => detect(node.right)),
                );
            })
            .with(AST_NODE_TYPES.ConditionalExpression, () => {
                if (!("consequent" in node) || !("alternate" in node) || I.isNullable(node.alternate)) {
                    return O.none();
                }
                const maybeAlternate = detect(node.alternate);

                return F.pipe(
                    detect(node.consequent),
                    O.orElse(() => maybeAlternate),
                );
            })
            .with(AST_NODE_TYPES.Identifier, () => {
                if (!("name" in node) || !I.isString(node.name)) {
                    return O.none();
                }

                const maybeLatestDef = F.pipe(
                    scope.set.get(node.name),
                    O.fromNullable,
                    O.flatMapNullable((v) => v.defs.at(-1)),
                );

                if (O.isNone(maybeLatestDef)) {
                    return O.none();
                }

                const latestDef = maybeLatestDef.value;

                if (latestDef.type !== DefinitionType.Variable && latestDef.type !== DefinitionType.FunctionName) {
                    return O.none();
                }

                if (AST.is(AST_NODE_TYPES.FunctionDeclaration)(latestDef.node)) {
                    return O.some({ type: ConstructionType.FUNCTION_DECLARATION, node: latestDef.node, usage: node });
                }

                if (!("init" in latestDef.node) || latestDef.node.init === null) {
                    return O.none();
                }

                return detect(latestDef.node.init);
            })
            .with(AST_NODE_TYPES.Literal, () => {
                if ("regex" in node) {
                    return O.some({ type: ConstructionType.REGULAR_EXPRESSION, node });
                }
                return O.none();
            })
            .with(P.union(AST_NODE_TYPES.TSAsExpression, AST_NODE_TYPES.TSTypeAssertion), () => {
                if (!("expression" in node) || !I.isObject(node.expression)) {
                    return O.none();
                }

                return detect(node.expression);
            })
            .otherwise(O.none);
    };

    return detect;
}
