import { Check, Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a statement terminates the control flow of its block
 * (a `return`/`throw`, or a block containing one)
 * @param node The node to check
 * @returns `true` if the statement terminates the control flow
 */
export function isTerminatingStatement(node: TSESTree.Node): boolean {
  if (node.type === AST.ReturnStatement || node.type === AST.ThrowStatement) return true;
  if (node.type === AST.BlockStatement) return node.body.some(isTerminatingStatement);
  return false;
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
  switch (param.type) {
    case AST.Identifier:
      return param;
    case AST.AssignmentPattern:
      return param.left.type === AST.Identifier ? param.left : null;
    default:
      return null;
  }
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
