import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";

function resolveDynamicValue(
  context: RuleContext,
  node: TSESTree.Node,
  isInsideRender: (node: TSESTree.Node) => boolean,
  seen: Set<TSESLint.Scope.Variable>,
): boolean {
  const expr = Extract.unwrap(node);

  switch (expr.type) {
    case AST.FunctionExpression:
    case AST.ArrowFunctionExpression:
    case AST.NewExpression:
    case AST.CallExpression:
    case AST.ClassExpression:
      return true;
    case AST.ConditionalExpression:
      return resolveDynamicValue(context, expr.consequent, isInsideRender, seen)
        || resolveDynamicValue(context, expr.alternate, isInsideRender, seen);
    case AST.Identifier:
    case AST.JSXIdentifier: {
      const resolved = findVariableForIdentifier(context, expr);
      if (resolved == null) return false;
      return isDynamicComponent(context, resolved, isInsideRender, seen);
    }
    default:
      return false;
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

export function isDynamicComponent(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: (node: TSESTree.Node) => boolean,
  seen = new Set<TSESLint.Scope.Variable>(),
): boolean {
  if (seen.has(variable)) return false;
  seen.add(variable);

  for (const def of variable.defs) {
    const defNode = def.node;
    if (!isInsideRender(defNode)) continue;

    if (defNode.type === AST.FunctionDeclaration) return true;
    if (defNode.type === AST.ClassDeclaration) return true;

    if (defNode.type === AST.VariableDeclarator) {
      if (defNode.init != null) {
        if (resolveDynamicValue(context, defNode.init, isInsideRender, seen)) return true;
      }

      for (const ref of variable.references) {
        if (!ref.isWrite()) continue;
        const id = ref.identifier;
        if (
          id.parent?.type === AST.AssignmentExpression
          && id.parent.left === id
        ) {
          if (resolveDynamicValue(context, id.parent.right, isInsideRender, seen)) return true;
        }
      }
    }
  }

  return false;
}
