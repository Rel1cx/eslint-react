import { is, isOneOf, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { Data, O } from "@eslint-react/std";
import { DefinitionType, type Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { isObject, isString } from "effect/Predicate";
import { isNil } from "rambda";
import { match } from "ts-pattern";

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
 * @param context The rule context
 */
export function constructionDetector<T extends RuleContext>(context: T): (node: TSESTree.Node, scope: Scope) => Construction {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const detect = (node: TSESTree.Node, scope = context.getScope()): Construction => {
        return match(node)
            .when(is(NodeType.ArrayExpression), (node) => Construction("Array")({ node }))
            .when(is(NodeType.ObjectExpression), (node) => Construction("ObjectExpression")({ node }))
            .when(is(NodeType.ClassExpression), (node) => Construction("ClassExpression")({ node }))
            .when(is(NodeType.JSXElement), (node) => Construction("JSXElement")({ node }))
            .when(is(NodeType.JSXFragment), (node) => Construction("JSXFragment")({ node }))
            .when(is(NodeType.NewExpression), (node) => Construction("NewExpression")({ node }))
            .when(isOneOf([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]), (node) => {
                return Construction("FunctionExpression")({ node });
            })
            .when(is(NodeType.MemberExpression), (node) => {
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
            .when(is(NodeType.AssignmentExpression), (node) => {
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
            .when(is(NodeType.LogicalExpression), (node) => {
                if (!("left" in node && "right" in node)) {
                    return None;
                }

                const left = detect(node.left);

                if (left._tag === "None") {
                    return None;
                }

                return detect(node.right);
            })
            .when(is(NodeType.ConditionalExpression), (node) => {
                if (!("consequent" in node && "alternate" in node && !isNil(node.alternate))) {
                    return None;
                }

                const consequent = detect(node.consequent);

                if (consequent._tag === "None") {
                    return None;
                }

                return detect(node.alternate);
            })
            .when(is(NodeType.Identifier), (node) => {
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

                if (latestDef.node.type === NodeType.FunctionDeclaration) {
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
            .when(is(NodeType.Literal), (node) => {
                if ("regex" in node) {
                    return Construction("RegExpLiteral")({ node });
                }

                return None;
            })
            .when(isOneOf([NodeType.TSAsExpression, NodeType.TSTypeAssertion]), () => {
                if (!("expression" in node) || !isObject(node.expression)) {
                    return None;
                }

                return detect(node.expression);
            })
            .otherwise(() => None);
    };

    return detect;
}
