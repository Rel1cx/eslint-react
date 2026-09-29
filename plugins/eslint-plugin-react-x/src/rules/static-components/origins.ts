import { Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { type IsInsideRender, KNOWN_DYNAMIC_EXPRESSION_TYPES } from "./lib";

export type DynamicComponentOrigin = {
  creationNode: TSESTree.Node | null;
  isDynamic: boolean;
};

/**
 * Resolves an expression down to the node that dynamically created its value, if any.
 * Recurses through identifier references, both branches of ternaries and logical
 * expressions, and the final element of sequence expressions.
 */
function findDynamicCreationSite(
  context: RuleContext,
  node: TSESTree.Node,
  isInsideRender: IsInsideRender,
  seen: Set<TSESLint.Scope.Variable>,
): TSESTree.Node | null {
  const expr = Extract.unwrap(node);

  if (KNOWN_DYNAMIC_EXPRESSION_TYPES.has(expr.type)) {
    return expr;
  }

  switch (expr.type) {
    case AST.ConditionalExpression:
      return findDynamicCreationSite(context, expr.consequent, isInsideRender, seen)
        ?? findDynamicCreationSite(context, expr.alternate, isInsideRender, seen);
    case AST.LogicalExpression:
      return findDynamicCreationSite(context, expr.left, isInsideRender, seen)
        ?? findDynamicCreationSite(context, expr.right, isInsideRender, seen);
    case AST.SequenceExpression: {
      const last = expr.expressions.at(-1);
      return last == null ? null : findDynamicCreationSite(context, last, isInsideRender, seen);
    }
    case AST.Identifier:
    case AST.JSXIdentifier: {
      const variable = findVariable(context.sourceCode.getScope(expr), expr.name);
      if (variable == null) return null;
      return resolveDynamicComponentOrigin(context, variable, isInsideRender, seen).creationNode;
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

/**
 * Resolves a component binding to the node that dynamically created its value, if the
 * value is created during render (a fresh function/class/call result on every render).
 */
export function resolveDynamicComponentOrigin(
  context: RuleContext,
  variable: TSESLint.Scope.Variable,
  isInsideRender: IsInsideRender,
  seen = new Set<TSESLint.Scope.Variable>(),
): DynamicComponentOrigin {
  if (seen.has(variable)) return { creationNode: null, isDynamic: false };
  seen.add(variable);

  for (const def of variable.defs) {
    const defNode = def.node;
    if (!isInsideRender(defNode)) continue;

    // Judge by definition type rather than node type: a parameter's def node is its
    // enclosing function, which would otherwise be mistaken for a function declaration
    // created during render.
    if (def.type === DefinitionType.FunctionName || def.type === DefinitionType.ClassName) {
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
