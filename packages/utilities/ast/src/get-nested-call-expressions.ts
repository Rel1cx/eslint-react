import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { getNestedExpressionsOfType } from "./get-nested-expressions-of-type";

/**
 * Get all nested call expressions in a expression like node
 * @param node The node to get the nested call expressions from
 * @returns All nested call expressions
 */
export const getNestedCallExpressions = getNestedExpressionsOfType(AST_NODE_TYPES.CallExpression);
