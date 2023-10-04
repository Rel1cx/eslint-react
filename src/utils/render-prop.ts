import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings";
import * as AST from "./ast";
import { isJSXValue } from "./jsx";

/**
 * Unsafe check whether given node is a render function
 * ```jsx
 * const renderRow = () => <div />
 * `                 ^^^^^^^^^^^^`
 * _ = <Component renderRow={() => <div />} />
 * `                         ^^^^^^^^^^^^^   `
 * ```
 * @param node The AST node to check
 * @param context Rule context
 * @returns True if node is a render function, false if not
 */
export function unsafeIsRenderFunction(node: AST.TSESTreeFunction, context: RuleContext) {
    const { body, parent } = node;

    const id = AST.getFunctionIdentifier(node);

    if (!id?.name.startsWith("render")) {
        return AST.is(N.JSXExpressionContainer)(parent)
            && AST.is(N.JSXAttribute)(parent.parent)
            && AST.is(N.JSXIdentifier)(parent.parent.name)
            && parent.parent.name.name.startsWith("render");
    }

    return isJSXValue(body, context, true, true);
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * ```jsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 * @param node The AST node to check
 * @param context Rule context
 * @returns True if node is a render prop, false if not
 */
export function unsafeIsRenderProp(node: TSESTree.JSXAttribute, context: RuleContext) {
    return AST.is(N.JSXIdentifier)(node.name)
        && node.name.name.startsWith("render")
        && node.value
        && AST.is(N.JSXExpressionContainer)(node.value)
        && AST.isFunction(node.value.expression)
        && unsafeIsRenderFunction(node.value.expression, context);
}

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```jsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @param node The AST node to check
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

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```jsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns True if component is declared inside a render prop, false if not
 */
export function unsafeIsDeclaredInRenderProp(node: TSESTree.Node) {
    if (
        node.parent
        && AST.is(N.Property)(node.parent)
        && "key" in node.parent
        && "name" in node.parent.key
        && node.parent.key.name.startsWith("render")
    ) {
        return true;
    }

    const jsxExpressionContainer = AST.traverseUpOnlyPredicate(node, AST.is(N.JSXExpressionContainer));

    return (
        jsxExpressionContainer?.parent
        && AST.is(N.JSXAttribute)(jsxExpressionContainer.parent)
        && "name" in jsxExpressionContainer.parent
        && AST.is(N.JSXIdentifier)(jsxExpressionContainer.parent.name)
        && jsxExpressionContainer.parent.name.name.startsWith("render")
    );
}
