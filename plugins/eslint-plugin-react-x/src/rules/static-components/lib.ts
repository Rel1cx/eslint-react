import { Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export interface DynamicComponentResult {
  creationNode: TSESTree.Node | null;
  isDynamic: boolean;
}

type IsInsideRender = (node: TSESTree.Node) => boolean;

/**
 * Expression kinds that always produce a brand-new value on every evaluation, and are
 * therefore considered "dynamically created" when used as a component's value.
 */
const DYNAMIC_EXPRESSION_TYPES: ReadonlySet<TSESTree.Node["type"]> = new Set([
  AST.ArrowFunctionExpression,
  AST.CallExpression,
  AST.ClassExpression,
  AST.FunctionExpression,
  AST.NewExpression,
]);

export function findVariableForIdentifier(
  context: RuleContext,
  identifier: TSESTree.Identifier | TSESTree.JSXIdentifier,
): TSESLint.Scope.Variable | null {
  const scope = context.sourceCode.getScope(identifier);
  return findVariable(scope, identifier.name);
}

/**
 * Resolves an expression down to the node that dynamically created its value, if any.
 * Recurses through identifier references and both branches of ternaries.
 */
function findDynamicCreationSite(
  context: RuleContext,
  node: TSESTree.Node,
  isInsideRender: IsInsideRender,
  seen: Set<TSESLint.Scope.Variable>,
): TSESTree.Node | null {
  const expr = Extract.unwrap(node);

  if (DYNAMIC_EXPRESSION_TYPES.has(expr.type)) {
    return expr;
  }

  switch (expr.type) {
    case AST.ConditionalExpression:
      return findDynamicCreationSite(context, expr.consequent, isInsideRender, seen) ?? findDynamicCreationSite(context, expr.alternate, isInsideRender, seen);
    case AST.Identifier:
    case AST.JSXIdentifier: {
      const variable = findVariableForIdentifier(context, expr);
      if (variable == null) return null;
      return getDynamicComponentSource(context, variable, isInsideRender, seen).creationNode;
    }
    default:
      return null;
  }
}

/**
 * Looks for a reassignment of `variable` (e.g. `Component = createComponent();`) whose
 * right-hand side is dynamically created.
 */
function findReassignmentCreationSite(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: IsInsideRender,
  seen: Set<TSESLint.Scope.Variable>,
): TSESTree.Node | null {
  for (const ref of variable.references) {
    if (!ref.isWrite()) continue;
    const { identifier } = ref;
    if (identifier.parent.type !== AST.AssignmentExpression || identifier.parent.left !== identifier) continue;
    const source = findDynamicCreationSite(context, identifier.parent.right, isInsideRender, seen);
    if (source != null) return source;
  }
  return null;
}

export function getDynamicComponentSource(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: IsInsideRender,
  seen = new Set<TSESLint.Scope.Variable>(),
): DynamicComponentResult {
  if (seen.has(variable)) return { creationNode: null, isDynamic: false };
  seen.add(variable);

  for (const def of variable.defs) {
    const defNode = def.node;
    if (!isInsideRender(defNode)) continue;

    if (defNode.type === AST.FunctionDeclaration || defNode.type === AST.ClassDeclaration) {
      return { creationNode: defNode, isDynamic: true };
    }

    if (defNode.type !== AST.VariableDeclarator) continue;

    const initSource = defNode.init == null
      ? null
      : findDynamicCreationSite(context, defNode.init, isInsideRender, seen);
    if (initSource != null) {
      return { creationNode: initSource, isDynamic: true };
    }

    const reassignmentSource = findReassignmentCreationSite(context, variable, isInsideRender, seen);
    if (reassignmentSource != null) {
      return { creationNode: reassignmentSource, isDynamic: true };
    }
  }

  return { creationNode: null, isDynamic: false };
}
