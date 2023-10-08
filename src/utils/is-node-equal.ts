import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

/**
 * Determines whether node equals to another node
 * @param a node
 * @param b node
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export function isNodeEqual(a: TSESTree.Node, b: TSESTree.Node): boolean {
    if (a.type !== b.type) {
        return false;
    }
    if (a.type === N.ThisExpression && b.type === N.ThisExpression) {
        return true;
    }
    if (a.type === N.Literal && b.type === N.Literal) {
        return a.value === b.value;
    }
    if (a.type === N.Identifier && b.type === N.Identifier) {
        return a.name === b.name;
    }
    if (a.type === N.MemberExpression && b.type === N.MemberExpression) {
        return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
    }

    return false;
}
