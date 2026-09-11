import { Check, Extract } from "@eslint-react/ast";
import type { RichContext } from "@eslint-react/core";
import { DefinitionType, ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Return whether an identifier is an unresolved global or is declared in the
 * global/module scope.
 */
export function isGlobalVariable(context: RichContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.src.getScope(node), node);
  if (variable == null || variable.defs.length === 0) return true;
  return variable.scope.type === ScopeType.global || variable.scope.type === ScopeType.module;
}

/**
 * Resolve an object expression to the global/module binding it aliases.
 *
 * This intentionally follows only stable `const alias = value` declarations.
 * It gives the rule useful Alias effects without pretending to perform full
 * control-flow analysis for reassigned locals.
 */
export function resolveGlobalOrigin(context: RichContext, node: TSESTree.Expression, seen = new Set<TSESTree.Node>()): TSESTree.Identifier | null {
  const expression = Extract.unwrap(node);
  if (seen.has(expression)) return null;
  seen.add(expression);

  if (expression.type === AST.MemberExpression) {
    return resolveGlobalOrigin(context, expression.object, seen);
  }
  if (!Check.isIdentifier(expression)) return null;
  if (isGlobalVariable(context, expression)) return expression;

  const variable = findVariable(context.src.getScope(expression), expression);
  const definition = variable?.defs.length === 1 ? variable.defs[0] : null;
  if (definition?.type !== DefinitionType.Variable) return null;
  if (!Check.isIdentifier(definition.node.id) || definition.node.init == null) return null;
  const declaration = definition.node.parent;
  if (declaration.kind !== "const") return null;

  const initializer = Extract.unwrap(definition.node.init);
  if (initializer.type !== AST.Identifier && initializer.type !== AST.MemberExpression) return null;
  return resolveGlobalOrigin(context, initializer, seen);
}
