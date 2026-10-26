import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { resolveBindingTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the call expression that immediately invokes a function expression
 * (an IIFE), looking through TypeScript and chain wrappers around the callee.
 * @param fn The function node to check
 * @returns The invoking call expression, or `null` when the function is not
 * immediately invoked at its definition site
 */
export function getImmediateInvocation(fn: TSESTreeFunction): TSESTree.CallExpression | null {
  let parent = fn.parent;
  while (Check.isTypeOrChainExpression(parent)) parent = parent.parent;
  if (parent.type !== AST.CallExpression) return null;
  return Extract.unwrap(parent.callee) === fn ? parent : null;
}

export function getConditionalBranch(node: TSESTree.Node): TSESTree.Node | null {
  let child: TSESTree.Node = node;
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && !Check.isFunction(current)) {
    if (Check.isLoopStatement(current) && child === current.body) return child;
    switch (current.type) {
      case AST.IfStatement:
      case AST.ConditionalExpression:
        if (child === current.consequent || child === current.alternate) return child;
        break;
      case AST.LogicalExpression:
        if (child === current.right) return child;
        break;
      case AST.SwitchCase:
        return current;
    }
    child = current;
    current = current.parent;
  }
  return null;
}

export function uniqueTargets<T extends { kind: string; node: TSESTree.Node }>(targets: readonly T[]): T[] {
  const seen = new Set<string>();
  return targets.filter((target) => {
    const key = `${target.kind}:${String(target.node.range[0])}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function isRefLikeName(name: string) {
  return name === "ref" || name.endsWith("Ref");
}

export function getParameterId(param: TSESTree.Parameter): TSESTree.Identifier | null {
  const target = resolveBindingTarget(param);
  return target.type === AST.Identifier ? target : null;
}

export function getRefSourceName(node: TSESTree.Node): string | null {
  switch (node.type) {
    case AST.Identifier:
      return node.name;
    case AST.MemberExpression: {
      const property = Extract.unwrap(node.property);
      return !node.computed && property.type === AST.Identifier ? property.name : null;
    }
    default:
      return null;
  }
}
