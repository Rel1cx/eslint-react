import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings";
import * as AST from "./ast";
import { isJSXValue } from "./jsx";
import type { ESFunction } from "./node";

/**
 * Check whether given node is a render prop
 * ```jsx
 * <Component renderRow={() => <div />} />
 * <Component>{() => <div />}</Component>
 * ```
 * @returns True if node is a render prop, false if not
 */
export function isRenderProp() {
    // TODO: implement this
    return false;
}

/**
 * Check whether given node is a render function
 * ```jsx
 * const renderRow = () => <div />
 * const renderRow = function () { return <div /> }
 * function renderRow() { return <div /> }
 * ```
 * @param node The AST node
 * @param context Rule context
 * @returns True if node is a render function, false if not
 */
export function unsafeIsRenderFunction(node: ESFunction, context: RuleContext) {
    const { body } = node;

    const id = AST.getFunctionIdentifier(node);

    if (!id?.name.startsWith("render")) {
        return false;
    }

    return isJSXValue(body, context, true, true);
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```jsx
 * <Component renderRow={() => <div />} />
 * <Component>{() => <div />}</Component>
 * ```
 * @param node The AST node
 * @returns True if component is declared inside a render prop, false if not
 */
export function unsafeIsReactComponentInRenderProp(node: TSESTree.Node) {
    if (
        node.parent
        && AST.is(N.Property)(node.parent)
        && "key" in node.parent
        && "name" in node.parent.key
        && node.parent.key.name.startsWith("render")
    ) {
        return true;
    }

    // Check whether component is a render prop used as direct children, e.g. <Component>{() => <div />}</Component>
    if (
        node.parent
        && AST.is(N.JSXExpressionContainer)(node.parent)
        && AST.is(N.JSXElement)(node.parent.parent)
    ) {
        return true;
    }

    const jsxExpressionContainer = AST.traverseUpOnlyPredicate(node, AST.is(N.JSXExpressionContainer));

    // Check whether prop name indicates accepted patterns
    if (
        jsxExpressionContainer?.parent
        && AST.is(N.JSXAttribute)(jsxExpressionContainer.parent)
        && "name" in jsxExpressionContainer.parent
        && AST.is(N.JSXIdentifier)(jsxExpressionContainer.parent.name)
    ) {
        const propName = jsxExpressionContainer.parent.name.name;

        // Starts with render, e.g. <Component renderRow={() => <div />} />
        if (propName.startsWith("render")) {
            return true;
        }

        // Uses children prop explicitly, e.g. <Component children={() => <div />} />
        if (propName === "children") {
            return true;
        }
    }

    return false;
}

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```jsx
 * const rows = { render: () => <div /> }
 * <Component rows={ [{ render: () => <div /> }] } />
 *  ```
 * @param node The AST node
 * @returns True if component is declared inside a render property, false if not
 */
export function unsafeIsDirectValueOfRenderProperty(node: TSESTree.Node) {
    return (
        AST.is(N.Property)(node.parent)
        && "key" in node.parent
        && AST.is(N.Identifier)(node.parent.key)
        && node.parent.key.name.startsWith("render")
    );
}
