import { AST_NODE_TYPES as T } from "@typescript-eslint/typescript-estree";

import { getNestedExpressionsOfType } from "./get-nested-expressions-of-type";

/**
 * Get all nested new expressions in an expression like node
 * @param node The node to get the nested new expressions from
 * @returns All nested new expressions
 */
export const getNestedNewExpressions = getNestedExpressionsOfType(T.NewExpression);
