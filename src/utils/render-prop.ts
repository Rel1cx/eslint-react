import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { RuleContext } from "../../typings";
import * as AST from "./ast";
import { isJSXValue } from "./jsx";

/**
 * Unsafe check whether given node is a render function
 * @param node The AST node to check
 * @param context Rule context
 * @returns `true` if node is a render function, `false` if not
 * @example
 * ```jsx
 * const renderRow = () => <div />
 * `                 ^^^^^^^^^^^^`
 * _ = <Component renderRow={() => <div />} />
 * `                         ^^^^^^^^^^^^^   `
 * ```
 */
export function unsafeIsRenderFunction(node: AST.TSESTreeFunction, context: RuleContext) {
    const { body, parent } = node;

    const id = AST.getFunctionIdentifier(node);

    if (!id?.name.startsWith("render")) {
        return parent.type === N.JSXExpressionContainer
            && parent.parent.type === N.JSXAttribute
            && parent.parent.name.type === N.JSXIdentifier
            && parent.parent.name.name.startsWith("render");
    }

    return isJSXValue(body, context, true, true);
}

/**
 * Unsafe check whether given JSXAttribute is a render prop
 * @param node The AST node to check
 * @param context Rule context
 * @returns `true` if node is a render prop, `false` if not
 * @example
 * ```jsx
 * _ = <Component renderRow={() => <div />} />
 * `              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
 * ```
 */
export function unsafeIsRenderProp(node: TSESTree.JSXAttribute, context: RuleContext) {
    return node.name.type === N.JSXIdentifier
        && node.name.name.startsWith("render")
        && node.value
        && node.value.type === N.JSXExpressionContainer
        && AST.isFunction(node.value.expression)
        && unsafeIsRenderFunction(node.value.expression, context);
}

/**
 * Unsafe check whether given node is declared directly inside a render property
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 * @example
 * ```jsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 */
export function unsafeIsDirectValueOfRenderProperty(node: TSESTree.Node) {
    return (
        node.parent?.type === N.Property
        && "key" in node.parent
        && node.parent.key.type === N.Identifier
        && node.parent.key.name.startsWith("render")
    );
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 * @example
 * ```jsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 */
export function unsafeIsDeclaredInRenderProp(node: TSESTree.Node) {
    if (
        node.parent
        && node.parent.type === N.Property
        && "key" in node.parent
        && "name" in node.parent.key
        && node.parent.key.name.startsWith("render")
    ) {
        return true;
    }

    const jsxExpressionContainer = AST.traverseUp(node, AST.is(N.JSXExpressionContainer));

    return (
        jsxExpressionContainer?.parent
        && jsxExpressionContainer.parent.type === N.JSXAttribute
        && "name" in jsxExpressionContainer.parent
        && jsxExpressionContainer.parent.name.type === N.JSXIdentifier
        && jsxExpressionContainer.parent.name.name.startsWith("render")
    );
}
