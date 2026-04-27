import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";

export interface DynamicComponentResult {
  creationNode: TSESTree.Node | null;
  isDynamic: boolean;
}

function resolveDynamicValue(
  context: RuleContext,
  node: TSESTree.Node,
  isInsideRender: (node: TSESTree.Node) => boolean,
  seen: Set<TSESLint.Scope.Variable>,
): TSESTree.Node | null {
  const expr = Extract.unwrap(node);

  switch (expr.type) {
    case AST.FunctionExpression:
    case AST.ArrowFunctionExpression:
    case AST.NewExpression:
    case AST.CallExpression:
    case AST.ClassExpression:
      return expr;
    case AST.ConditionalExpression: {
      const consequent = resolveDynamicValue(context, expr.consequent, isInsideRender, seen);
      if (consequent != null) return consequent;
      return resolveDynamicValue(context, expr.alternate, isInsideRender, seen);
    }
    case AST.Identifier:
    case AST.JSXIdentifier: {
      const resolved = findVariableForIdentifier(context, expr);
      if (resolved == null) return null;
      const result = getDynamicComponentSource(context, resolved, isInsideRender, seen);
      return result.creationNode;
    }
    default:
      return null;
  }
}

export function findVariableForIdentifier(
  context: RuleContext,
  identifier: TSESTree.Identifier | TSESTree.JSXIdentifier,
): TSESLint.Scope.Variable | null {
  let scope: ReturnType<typeof context.sourceCode.getScope> | null = context.sourceCode.getScope(identifier);
  while (scope != null) {
    const variable = scope.variables.find((v) => v.name === identifier.name);
    if (variable != null) return variable;
    scope = scope.upper;
  }
  return null;
}

export function getDynamicComponentSource(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: (node: TSESTree.Node) => boolean,
  seen = new Set<TSESLint.Scope.Variable>(),
): DynamicComponentResult {
  if (seen.has(variable)) return { creationNode: null, isDynamic: false };
  seen.add(variable);

  for (const def of variable.defs) {
    const defNode = def.node;
    if (!isInsideRender(defNode)) continue;

    if (defNode.type === AST.FunctionDeclaration) {
      return { creationNode: defNode, isDynamic: true };
    }
    if (defNode.type === AST.ClassDeclaration) {
      return { creationNode: defNode, isDynamic: true };
    }

    if (defNode.type === AST.VariableDeclarator) {
      if (defNode.init != null) {
        const source = resolveDynamicValue(context, defNode.init, isInsideRender, seen);
        if (source != null) {
          return { creationNode: source, isDynamic: true };
        }
      }

      for (const ref of variable.references) {
        if (!ref.isWrite()) continue;
        const id = ref.identifier;
        if (
          id.parent?.type === AST.AssignmentExpression
          && id.parent.left === id
        ) {
          const source = resolveDynamicValue(context, id.parent.right, isInsideRender, seen);
          if (source != null) {
            return { creationNode: source, isDynamic: true };
          }
        }
      }
    }
  }

  return { creationNode: null, isDynamic: false };
}

export function isDynamicComponent(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: (node: TSESTree.Node) => boolean,
  seen = new Set<TSESLint.Scope.Variable>(),
): boolean {
  return getDynamicComponentSource(context, variable, isInsideRender, seen).isDynamic;
}
