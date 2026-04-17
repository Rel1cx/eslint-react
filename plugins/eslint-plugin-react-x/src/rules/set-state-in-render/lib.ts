import { Check, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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

export function isInsideEventHandler(node: TSESTree.Node, stopAt: TSESTreeFunction) {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && current !== stopAt) {
    if (Check.isFunction(current) && current !== stopAt) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

export function isComponentOrHookLikeFunction(node: TSESTreeFunction) {
  const id = core.getFunctionId(node);
  if (id == null) return false;
  if (id.type === AST.Identifier) {
    return core.isFunctionComponentName(id.name) || core.isHookName(id.name);
  }
  if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
    return core.isFunctionComponentName(id.property.name) || core.isHookName(id.property.name);
  }
  return false;
}
