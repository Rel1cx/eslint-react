import { NodeType, traverseUp, type TSESTreeClass, type TSESTreeFunction } from "@eslint-react/ast";
import { getCreateClassFromContext, getFromContext } from "@eslint-react/pragma";
import type { RuleContext } from "@eslint-react/shared";
import { E, F } from "@eslint-react/std";
import { type Scope } from "@typescript-eslint/scope-manager";
import { type TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

const isRenderMethodLike = isMatching({
    key: {
        name: "render",
        type: NodeType.Identifier,
    },
    type: P.union(NodeType.MethodDefinition, NodeType.PropertyDefinition),
    parent: {
        type: NodeType.ClassBody,
        parent: {
            type: NodeType.ClassDeclaration,
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
                type: NodeType.MemberExpression,
                object: { name: pragma },
                property: { name: createClass },
            },
            F.constTrue,
        )
        .with({ name: createClass, type: NodeType.Identifier }, F.constTrue)
        .otherwise(F.constFalse);
}

/**
 * Check if a node is a React ES6 component
 * @param node The node to check
 * @param context The rule context
 * @deprecated It will be removed in the future.
 */
export function isES6Component(node: TSESTree.Node, context: RuleContext): node is TSESTreeClass {
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
        .with({ name: P.string, type: NodeType.Identifier }, ({ name }) => /^(Pure)?Component$/u.test(name))
        .with(
            {
                type: NodeType.MemberExpression,
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    while (scope && scope.type !== "class") {
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
    type: NodeType.MemberExpression,
    object: {
        type: NodeType.ThisExpression,
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

const seenComponents = new WeakSet<TSESTreeClass>();

export function componentCollectorLegacy(context: RuleContext) {
    const components: TSESTreeClass[] = [];

    const ctx = {
        getAllComponents() {
            if (context.getScope().block.type !== NodeType.Program) {
                throw new Error("getAllComponents should only be called in Program:exit");
            }

            return components;
        },
        getCurrentComponents() {
            return [...components];
        },
    } as const;

    const collect = (node: TSESTreeClass) => {
        if (seenComponents.has(node)) {
            components.push(node);
        }

        if (!isES6Component(node, context)) {
            return;
        }

        seenComponents.add(node);
        components.push(node);
    };

    const listeners = {
        ClassDeclaration: collect,
        ClassExpression: collect,
    } as const satisfies RuleListener;

    return {
        ctx,
        listeners,
    } as const;
}
