import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F } from "../lib/primitives";
import { getCreateClassFromContext, getFromContext } from "./pragma";

/**
 * Check if a node is a React ES5 component
 * @param node The node to check
 * @param context The rule context
 * @package
 * @deprecated It will be removed in the future.
 */
export function isES5Component(node: TSESTree.Node, context: RuleContext) {
    const maybeReact = getFromContext(context);
    const maybeCreateClass = getCreateClassFromContext(context);

    if (E.isLeft(maybeReact) || E.isLeft(maybeCreateClass)) {
        return false;
    }

    if (!node.parent || !("callee" in node.parent)) {
        return false;
    }

    const { callee } = node.parent;

    const pragma = maybeReact.right;
    const createClass = maybeCreateClass.right;

    return match(callee)
        .with(
            {
                type: N.MemberExpression,
                object: { name: pragma },
                property: { name: createClass },
            },
            F.constTrue,
        )
        .with({ name: createClass, type: N.Identifier }, F.constTrue)
        .otherwise(F.constFalse);
}

/**
 * Check if a node is a React ES6 component
 * @param node The node to check
 * @param context The rule context
 * @package
 * @deprecated It will be removed in the future.
 */
export function isES6Component(node: TSESTree.Node, context: RuleContext) {
    if (!("superClass" in node && node.superClass)) {
        return false;
    }
    const maybeReact = getFromContext(context);
    if (E.isLeft(maybeReact)) {
        return false;
    }
    const pragma = maybeReact.right;
    const { superClass } = node;

    return match(superClass)
        .with({ name: P.string, type: N.Identifier }, ({ name }) => /^(Pure)?Component$/u.test(name))
        .with(
            {
                type: N.MemberExpression,
                object: { name: pragma },
                property: { name: P.string },
            },
            ({ property }) => /^(Pure)?Component$/u.test(property.name),
        )
        .otherwise(() => false);
}

/**
 * Get the parent ES5 component of a node up to global scope
 * @param context The rule context
 * @package
 * @deprecated It will be removed in the future.
 */
export function getParentES6Component(context: RuleContext) {
    let scope: Scope | null = context.getScope();

    while (scope && scope.type !== ScopeType.class) {
        scope = scope.upper;
    }

    const node = scope?.block;

    if (!node || !isES6Component(node, context)) {
        return null;
    }

    return node;
}

/**
 * Check if a node is a React PureComponent
 * @param node The node to check
 * @param context The rule context
 * @package
 * @deprecated It will be removed in the future.
 */
export function isPureComponent(node: TSESTree.Node, context: RuleContext) {
    const pragma = getFromContext(context);

    const sourceCode = context.getSourceCode();

    if (E.isRight(pragma) && "superClass" in node && node.superClass) {
        const text = sourceCode.getText(node.superClass);

        // eslint-disable-next-line security/detect-non-literal-regexp
        return new RegExp(`^(${pragma.right}\\.)?PureComponent$`, "u").test(text);
    }

    return false;
}

/**
 * Check if a node is a MemberExpression of state
 * @param node The node to check
 * @package
 * @deprecated It will be removed in the future.
 */
export const isStateMemberExpression: (node: TSESTree.Node) => boolean = isMatching({
    type: N.MemberExpression,
    object: { type: N.ThisExpression },
    property: { name: "state" },
});
