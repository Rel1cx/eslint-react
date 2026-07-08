import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Iterator-like methods that pass the item's index to their callback,
 * mapped to the position of the index parameter in the callback's parameter list.
 * `map` and `forEach` also cover `Children.map` and `Children.forEach`,
 * whose callback is the second argument instead of the first.
 */
const INDEX_PARAM_POSITIONS = new Map<string, number>([
  ["every", 1],
  ["filter", 1],
  ["find", 1],
  ["findIndex", 1],
  ["findLast", 1],
  ["findLastIndex", 1],
  ["flatMap", 1],
  ["forEach", 1],
  ["map", 1],
  ["reduce", 2],
  ["reduceRight", 2],
  ["some", 1],
]);

/**
 * Checks whether an identifier is a reference to the index parameter of an
 * iterator-like method's callback (e.g. `i` in `items.map((item, i) => ...)`).
 * @param context The ESLint rule context.
 * @param node The identifier to check.
 * @returns `true` if the identifier resolves to an array index parameter.
 */
export function isArrayIndexReference(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
  const def = variable?.defs.at(0);
  if (def == null || def.type !== DefinitionType.Parameter) return false;
  const callback = def.node;
  if (!Check.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(callback)) return false;
  // The argument node as it appears in the call, including any TS type wrappers around the callback
  let argument: TSESTree.Node = callback;
  while (Check.isTypeExpression(argument.parent)) {
    argument = argument.parent;
  }
  const call = argument.parent;
  if (call.type !== AST.CallExpression) return false;
  const callee = Extract.unwrap(call.callee);
  if (callee.type !== AST.MemberExpression) return false;
  if (callee.property.type !== AST.Identifier) return false;
  const indexPosition = INDEX_PARAM_POSITIONS.get(callee.property.name);
  if (indexPosition == null) return false;
  // The callback is the first argument, or the second for `Children.map`/`Children.forEach`
  const callbackPosition = core.isChildrenMap(context, callee) || core.isChildrenForEach(context, callee)
    ? 1
    : 0;
  if (call.arguments[callbackPosition] !== argument) return false;
  // The resolved binding must be the parameter at the index position itself,
  // possibly wrapped in a default value assignment (e.g. `(item, i = 0) => ...`)
  const param = callback.params[indexPosition];
  if (param == null) return false;
  return param === def.name
    || (param.type === AST.AssignmentPattern && param.left === def.name);
}

/**
 * Recursively collects all identifiers from a binary expression.
 * e.g., for `a + b + c`, it returns identifiers for a, b, and c.
 * @param side The binary expression (or one of its sides) to collect from.
 * @returns The identifiers found in the expression.
 */
export function getIdentifiersFromBinaryExpression(
  side: TSESTree.BinaryExpression["left"],
): readonly TSESTree.Identifier[] {
  if (side.type === AST.Identifier) {
    return [side];
  }
  if (side.type === AST.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ] as const;
  }
  return [] as const;
}
