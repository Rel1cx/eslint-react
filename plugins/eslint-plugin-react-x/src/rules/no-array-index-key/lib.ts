import { isOneOf } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

/**
 * Creates a report function for the given rule context.
 * @param context The ESLint rule context.
 * @returns A function that can be used to report violations.
 */
export function report(context: RuleContext) {
  return (descriptor?: null | ReportDescriptor<string>) => {
    if (descriptor == null) return;
    return context.report(descriptor);
  };
}

export function getIndexParamPosition(methodName: string) {
  switch (methodName) {
    case "every":
    case "filter":
    case "find":
    case "findIndex":
    case "findLast":
    case "findLastIndex":
    case "flatMap":
    case "forEach":
    case "map":
    case "some":
      return 1;
    case "reduce":
    case "reduceRight":
      return 2;
    default:
      return -1;
  }
}

// Gets the name of the index parameter from a map-like function's callback
// e.g., in `data.map((item, index) => ...)` it returns 'index'
export function getMapIndexParamName(context: RuleContext, node: TSESTree.CallExpression): string | null {
  const { callee } = node;
  if (callee.type !== AST.MemberExpression) {
    return null;
  }
  if (callee.property.type !== AST.Identifier) {
    return null;
  }
  const { name } = callee.property;
  // Determines the position of the index parameter for array methods like 'map', 'forEach', etc
  const indexPosition = getIndexParamPosition(name);
  if (indexPosition === -1) {
    return null;
  }
  // The callback function is the first argument, or the second for `React.Children` methods
  const callbackArg = node.arguments[
    core.isChildrenMap(context, callee) || core.isChildrenForEach(context, callee)
      ? 1
      : 0
  ];
  if (callbackArg == null) {
    return null;
  }
  if (!isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(callbackArg)) {
    return null;
  }
  const { params } = callbackArg;
  if (params.length < indexPosition + 1) {
    return null;
  }
  const param = params.at(indexPosition);

  return param != null && "name" in param
    ? param.name
    : null;
}

// Recursively collects all identifiers from a binary expression
// e.g., for `a + b + c`, it returns identifiers for a, b, and c
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
