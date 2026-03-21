import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a node is a **host** (intrinsic / DOM) element.
 *
 * A host element is a `JSXElement` whose tag name is a plain `JSXIdentifier`
 * starting with a lowercase letter – the same heuristic React uses to
 * distinguish `<div>` from `<MyComponent>`.
 *
 * @param node - The AST node to test.
 * @returns `true` when the node is a `JSXElement` with a lowercase tag name.
 *
 * @example
 * ```ts
 * // <div className="box" />  -> true
 * // <span />                 -> true
 * // <MyComponent />          -> false
 * // <Foo.Bar />              -> false
 * isHostElement(node);
 * ```
 */
export function isHostElement(node: TSESTree.Node): node is TSESTree.JSXElement {
  return node.type === AST.JSXElement
    && node.openingElement.name.type === AST.JSXIdentifier
    && /^[a-z]/u.test(node.openingElement.name.name);
}
