import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { type TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F } from "../lib";
import { traverseUp } from "./ast-traverse";
import type { TSESTreeFunction } from "./ast-types";
import type * as AST from "./ast-types";
import { getCreateClassFromContext, getFromContext } from "./pragma";

const isRenderMethodLike = isMatching({
    type: P.union(N.MethodDefinition, N.PropertyDefinition),
    key: {
        type: N.Identifier,
        name: "render",
    },
    parent: {
        type: N.ClassBody,
        parent: {
            type: N.ClassDeclaration,
        },
    },
});

/**
 * Check if a node is a React ES5 component
 * @param node The node to check
 * @param context The rule context
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
        .with({ type: N.Identifier, name: createClass }, F.constTrue)
        .otherwise(F.constFalse);
}

/**
 * Check if a node is a React ES6 component
 * @param node The node to check
 * @param context The rule context
 * @deprecated It will be removed in the future.
 */
export function isES6Component(node: TSESTree.Node, context: RuleContext): node is TSESTree.ClassDeclaration {
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
        .with({ type: N.Identifier, name: P.string }, ({ name }) => /^(Pure)?Component$/u.test(name))
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
 * Get the parent ES6 component of a node up to global scope
 * @param context The rule context
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
 * @deprecated It will be removed in the future.
 */
export const isStateMemberExpression: (node: TSESTree.Node) => boolean = isMatching({
    type: N.MemberExpression,
    object: {
        type: N.ThisExpression,
    },
    property: {
        name: "state",
    },
});

export function isFunctionOfRenderMethod(node: TSESTreeFunction, context: RuleContext) {
    if (!isRenderMethodLike(node.parent)) {
        return false;
    }

    return isES6Component(node.parent.parent.parent, context);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```jsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @param context
 * @returns `true` if node is inside class component's render block, `false` if not
 * @deprecated It will be removed in the future.
 */
export function isInsideRenderMethod(node: TSESTree.Node, context: RuleContext) {
    const predicate = (node: TSESTree.Node): node is TSESTree.MethodDefinition => {
        const isRenderMethod = isRenderMethodLike(node);

        return isRenderMethod && isES6Component(node.parent.parent, context);
    };

    return !!traverseUp(node, predicate);
}

export function make(context: RuleContext) {
    const components: AST.TSESTreeClass[] = [];

    const ctx = {
        getAllComponents() {
            if (context.getScope().block.type !== N.Program) {
                throw new Error("getAllComponents should only be called in Program:exit");
            }

            return components;
        },
        getCurrentComponents() {
            return [...components];
        },
    } as const;

    const listeners = {
        CallExpression() {
            // TODO: Implement this
        },
        ClassDeclaration(node: TSESTree.ClassDeclaration) {
            if (isES6Component(node, context)) {
                components.push(node);
            }
        },
    } as const satisfies RuleListener;

    return {
        ctx,
        listeners,
    } as const;
}
