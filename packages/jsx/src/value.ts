import {
    findVariableByNameUpToGlobal,
    getVariableNthDefNodeInit,
    isJSXTagNameExpression,
    isOneOf,
    NodeType,
} from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import { match, P } from "ts-pattern";

import { isCreateElementCall } from "./create-element";

export type JSXValueCheckOptions = {
    /**
     * Whether to check all branches of the conditional expression
     */
    strict?: boolean;
    /**
     * Whether to ignore null values
     */
    ignoreNull?: boolean;
};

export const defaultJSXValueCheckOptions = {
    ignoreNull: false,
    strict: false,
} as const satisfies JSXValueCheckOptions;

/**
 * Check if a node is a JSX value
 * @param node The AST node to check
 * @param context The rule context
 * @param options The `JSXValueCheckOptions` to use
 * @returns boolean
 */
export function isJSXValue(
    node: TSESTree.Node | null | undefined,
    context: RuleContext,
    options: JSXValueCheckOptions = defaultJSXValueCheckOptions,
): boolean {
    if (!node) {
        return false;
    }

    // TODO: implement strict mode
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ignoreNull = false, strict = false } = options;

    return match(node.type)
        .with(NodeType.JSXElement, F.constTrue)
        .with(NodeType.JSXFragment, F.constTrue)
        .with(NodeType.Literal, () => {
            if (!("value" in node) || ignoreNull) {
                return false;
            }

            return node.value === null;
        })
        .with(NodeType.ConditionalExpression, () => {
            if (!("consequent" in node)) {
                return false;
            }

            const leftHasJSX = match(node.consequent)
                .with(P.array(), (n) => n.some((n) => isJSXValue(n, context, options)))
                .with(P.any, (n) => isJSXValue(n, context, options))
                .exhaustive();

            if (leftHasJSX) {
                return true;
            }

            return "alternate" in node && isJSXValue(node.alternate, context, options);
        })
        .with(NodeType.LogicalExpression, () => {
            if (!("left" in node)) {
                return false;
            }

            return isJSXValue(node.left, context, options) || isJSXValue(node.right, context, options);
        })
        .with(NodeType.SequenceExpression, () => {
            if (!("expressions" in node)) {
                return false;
            }
            const exp = node.expressions.at(-1);

            return isJSXValue(exp, context, options);
        })
        .with(NodeType.CallExpression, () => isCreateElementCall(node, context))
        .with(NodeType.Identifier, () => {
            if (!("name" in node)) {
                return false;
            }
            if (isJSXTagNameExpression(node)) {
                return true;
            }
            if (!isString(node.name) && node.name.type !== NodeType.Identifier) {
                return isJSXTagNameExpression(node.name);
            }
            const name = match(node.name)
                .with(P.string, F.identity)
                .with({ type: NodeType.Identifier }, (n) => n.name)
                .exhaustive();
            const variable = findVariableByNameUpToGlobal(name, context.getScope());

            return F.pipe(
                variable,
                O.flatMap(getVariableNthDefNodeInit(0)),
                O.map(isOneOf([NodeType.JSXElement, NodeType.JSXFragment])),
                O.getOrElse(F.constFalse),
            );
        })
        .otherwise(F.constFalse);
}
