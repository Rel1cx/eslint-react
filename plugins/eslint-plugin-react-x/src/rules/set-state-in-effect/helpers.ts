import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

const IDENTIFIER_VISITOR_KEYS = {
  [AST.ArrayExpression]: ["elements"],
  [AST.ArrayPattern]: ["elements"],
  [AST.AssignmentExpression]: ["left", "right"],
  [AST.AssignmentPattern]: ["left", "right"],
  [AST.AwaitExpression]: ["argument"],
  [AST.BinaryExpression]: ["left", "right"],
  [AST.CallExpression]: ["callee", "arguments"],
  [AST.ChainExpression]: ["expression"],
  [AST.ConditionalExpression]: ["test", "consequent", "alternate"],
  [AST.ForInStatement]: ["left", "right"],
  [AST.ForOfStatement]: ["left", "right"],
  [AST.ImportExpression]: ["source"],
  [AST.LogicalExpression]: ["left", "right"],
  [AST.MemberExpression]: ["object", "property"],
  [AST.NewExpression]: ["callee", "arguments"],
  [AST.ObjectExpression]: ["properties"],
  [AST.ObjectPattern]: ["properties"],
  [AST.Property]: ["value"],
  [AST.SequenceExpression]: ["expressions"],
  [AST.SpreadElement]: ["argument"],
  [AST.TaggedTemplateExpression]: ["tag", "quasi"],
  [AST.TemplateLiteral]: ["expressions"],
  [AST.TSAsExpression]: ["expression"],
  [AST.TSInstantiationExpression]: ["expression"],
  [AST.TSNonNullExpression]: ["expression"],
  [AST.TSSatisfiesExpression]: ["expression"],
  [AST.TSTypeAssertion]: ["expression"],
  [AST.UnaryExpression]: ["argument"],
  [AST.UpdateExpression]: ["argument"],
  [AST.YieldExpression]: ["argument"],
} as const;

/**
 * Get all nested identifiers in an expression-like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  simpleTraverse(node, {
    enter(node, parent) {
      if (node.type !== AST.Identifier) return;
      // Skip the property of a non-computed member access: `obj.prop` reads `obj`, not `prop`
      if (parent?.type === AST.MemberExpression && !parent.computed && parent.property === node) return;
      identifiers.push(node);
    },
    visitorKeys: IDENTIFIER_VISITOR_KEYS,
  });
  return identifiers;
}

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

export function getReturnExpressions(fn: TSESTreeFunction): readonly TSESTree.Node[] {
  if (fn.type === AST.ArrowFunctionExpression && fn.body.type !== AST.BlockStatement) return [fn.body];
  const returns: TSESTree.Node[] = [];
  const visitStatements = (statements: readonly TSESTree.Statement[]) => {
    for (const statement of statements) {
      switch (statement.type) {
        case AST.ReturnStatement:
          if (statement.argument != null) returns.push(statement.argument);
          break;
        case AST.BlockStatement:
          visitStatements(statement.body);
          break;
        case AST.IfStatement:
          visitStatements([statement.consequent]);
          if (statement.alternate != null) visitStatements([statement.alternate]);
          break;
        case AST.SwitchStatement:
          for (const switchCase of statement.cases) visitStatements(switchCase.consequent);
          break;
        case AST.TryStatement:
          visitStatements([statement.block]);
          if (statement.handler != null) visitStatements([statement.handler.body]);
          if (statement.finalizer != null) visitStatements([statement.finalizer]);
          break;
        case AST.DoWhileStatement:
        case AST.ForInStatement:
        case AST.ForOfStatement:
        case AST.ForStatement:
        case AST.LabeledStatement:
        case AST.WhileStatement:
        case AST.WithStatement:
          visitStatements([statement.body]);
          break;
        default:
          break;
      }
    }
  };
  if (fn.body.type !== AST.BlockStatement) return [];
  visitStatements(fn.body.body);
  return returns;
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
