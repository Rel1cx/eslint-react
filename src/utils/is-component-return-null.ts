import type { RuleContext } from "../../typings";
import type { TSESTreeFunction } from "./ast-types";
import { isNodeReturningJSX } from "./jsx";

/**
 * Check if the component is returning null
 * @param node The function node
 * @param context The rule context
 * @returns `true` if the component is returning null
 */
export function isComponentReturningNull(node: TSESTreeFunction, context: RuleContext) {
    return !isNodeReturningJSX(node, context, false, true);
}
