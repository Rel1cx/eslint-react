import type { TSESTree } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

/**
 * Unsafe check whether given node or its parent is directly inside `map` call
 * ```jsx
 * _ = <div>{items.map(item => <li />)}</div>
 * `                   ^^^^^^^^^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if node is directly inside `map` call, `false` if not
 */
export function unsafeIsMapCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
    return isMatching({
        callee: {
            property: {
                name: "map",
            },
        },
    })(node);
}
