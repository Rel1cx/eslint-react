import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESLint } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import { E, F } from "../lib/primitives/data";
import { getCreateClassFromContext, getFromContext } from "./pragma";

/**
 * @package
 * @deprecated Do not use this function. It will be removed in the future.
 */
export function isES5Component(node: TSESTree.Node, context: TSESLint.RuleContext<string, []>): boolean {
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
                type: AST_NODE_TYPES.MemberExpression,
                object: { name: pragma },
                property: { name: createClass },
            },
            F.constTrue,
        )
        .with({ name: createClass, type: AST_NODE_TYPES.Identifier }, F.constTrue)
        .otherwise(F.constFalse);
}

/**
 * @package
 * @deprecated Do not use this function. It will be removed in the future.
 */
export function isES6Component(node: TSESTree.Node, context: TSESLint.RuleContext<string, []>): boolean {
    if (!("superClass" in node) || !node.superClass) {
        return false;
    }

    const maybeReact = getFromContext(context);

    if (E.isLeft(maybeReact)) {
        return false;
    }

    const pragma = maybeReact.right;

    const { superClass } = node;

    return match(superClass)
        .with({ name: P.string, type: AST_NODE_TYPES.Identifier }, ({ name }) => /^(Pure)?Component$/u.test(name))
        .with(
            {
                type: AST_NODE_TYPES.MemberExpression,
                object: { name: pragma },
                property: { name: P.string },
            },
            ({ property }) => /^(Pure)?Component$/u.test(property.name),
        )
        .otherwise(() => false);
}

/**
 * @package
 * @deprecated Do not use this function. It will be removed in the future.
 */
export function getParentES6Component(context: TSESLint.RuleContext<string, []>) {
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
 * @package
 * @deprecated Do not use this function. It will be removed in the future.
 */
export function isPureComponent(node: TSESTree.Node, context: TSESLint.RuleContext<string, []>): boolean {
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
 * @package
 * @deprecated Do not use this function. It will be removed in the future.
 */
export const isStateMemberExpression: (node: TSESTree.Node) => boolean = isMatching({
    type: AST_NODE_TYPES.MemberExpression,
    object: { type: AST_NODE_TYPES.ThisExpression },
    property: { name: "state" },
});
