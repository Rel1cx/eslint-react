import * as ast from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isComponentWrapperCallLoose } from "./component-wrapper";

/**
 * Get function component identifier from `const Component = memo(() => {});`
 * @param context The rule context
 * @param node The function node to analyze
 * @returns The function identifier or `unit` if not found
 */
export function getFunctionComponentId(
  context: RuleContext,
  node: ast.TSESTreeFunction,
): ast.FunctionID | unit {
  const functionId = ast.getFunctionId(node);
  if (functionId != null) {
    return functionId;
  }
  const { parent } = node;
  // Get function component identifier from `const Component = memo(() => {});`
  if (
    parent.type === AST.CallExpression
    && isComponentWrapperCallLoose(context, parent)
    && parent.parent.type === AST.VariableDeclarator
  ) {
    return parent.parent.id;
  }
  // Get function component identifier from `const Component = memo(forwardRef(() => {}));`
  if (
    parent.type === AST.CallExpression
    && isComponentWrapperCallLoose(context, parent)
    && parent.parent.type === AST.CallExpression
    && isComponentWrapperCallLoose(context, parent.parent)
    && parent.parent.parent.type === AST.VariableDeclarator
  ) {
    return parent.parent.parent.id;
  }
  return unit;
}
