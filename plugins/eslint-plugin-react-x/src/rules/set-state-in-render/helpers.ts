import { Check, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

const isComponentOrHookName = or(core.isFunctionComponentName, core.isHookName);

export function isComponentOrHookLikeFunction(context: RuleContext, node: TSESTreeFunction) {
  const id = core.getFunctionId(node);
  if (id == null) {
    // Anonymous callbacks passed directly to `memo()`/`forwardRef()` have no
    // function id, but they are still component render functions.
    return core.isFunctionComponentWrapperCallback(context, node);
  }
  if (Check.isIdentifier(id)) {
    return isComponentOrHookName(id.name);
  }
  if (id.type === AST.MemberExpression && Check.isIdentifier(id.property)) {
    return isComponentOrHookName(id.property.name);
  }
  return false;
}

export function isInsideConditional(node: TSESTree.Node, stopAt: TSESTreeFunction) {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && current !== stopAt) {
    switch (current.type) {
      case AST.IfStatement:
      case AST.ConditionalExpression:
      case AST.LogicalExpression:
      case AST.SwitchStatement:
      case AST.SwitchCase:
        return true;
      default:
        break;
    }
    current = current.parent;
  }
  return false;
}
