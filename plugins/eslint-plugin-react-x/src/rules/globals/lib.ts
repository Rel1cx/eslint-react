import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { DefinitionType, ScopeType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Array methods that mutate the array in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export const MUTATING_ARRAY_METHODS = new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift",
]);

/**
 * Return whether an identifier is an unresolved global or is declared in the
 * global/module scope.
 */
export function isGlobalVariable(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
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
export function resolveGlobalOrigin(
  context: RuleContext,
  node: TSESTree.Expression,
  seen = new Set<TSESTree.Node>(),
): TSESTree.Identifier | null {
  const expression = Extract.unwrap(node);
  if (seen.has(expression)) return null;
  seen.add(expression);

  if (expression.type === AST.MemberExpression) {
    return resolveGlobalOrigin(context, expression.object, seen);
  }
  if (expression.type !== AST.Identifier) return null;
  if (isGlobalVariable(context, expression)) return expression;

  const variable = findVariable(context.sourceCode.getScope(expression), expression);
  const definition = variable?.defs.length === 1 ? variable.defs[0] : null;
  if (definition?.type !== DefinitionType.Variable) return null;
  if (definition.node.id.type !== AST.Identifier || definition.node.init == null) return null;
  const declaration = definition.node.parent;
  if (declaration.kind !== "const") return null;

  const initializer = Extract.unwrap(definition.node.init);
  if (initializer.type !== AST.Identifier && initializer.type !== AST.MemberExpression) return null;
  return resolveGlobalOrigin(context, initializer, seen);
}

/**
 * Collect every write target in an assignment, including destructuring
 * patterns such as `[local, globalValue] = source`.
 */
export function getAssignmentTargets(node: TSESTree.Node): (TSESTree.Identifier | TSESTree.MemberExpression)[] {
  const target = Extract.unwrap(node);
  switch (target.type) {
    case AST.Identifier:
    case AST.MemberExpression:
      return [target];
    case AST.ArrayPattern:
      return target.elements.flatMap((element) => element == null ? [] : getAssignmentTargets(element));
    case AST.AssignmentPattern:
      return getAssignmentTargets(target.left);
    case AST.ObjectPattern:
      return target.properties.flatMap((property) => {
        if (property.type === AST.RestElement) return getAssignmentTargets(property.argument);
        return getAssignmentTargets(property.value);
      });
    case AST.RestElement:
      return getAssignmentTargets(target.argument);
    default:
      return [];
  }
}

/** Resolve a direct call target, following simple function aliases. */
export function resolveToFunction(
  context: RuleContext,
  node: TSESTree.Node,
  seen = new Set<TSESTree.Node>(),
): TSESTreeFunction | null {
  const expression = Extract.unwrap(node);
  if (Check.isFunction(expression)) return expression;
  if (expression.type !== AST.Identifier || seen.has(expression)) return null;
  seen.add(expression);
  const resolved = resolve(context, expression);
  if (resolved == null) return null;
  return resolveToFunction(context, resolved, seen);
}
