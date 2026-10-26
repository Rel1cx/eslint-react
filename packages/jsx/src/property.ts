import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * Statically resolve a property key to a string.
 *
 * - Computed keys are evaluated with `getStaticValue`; only string results match.
 * - Non-computed identifier keys return their name.
 * - Non-computed string-literal keys return their value.
 * - All other keys return `null`.
 * @param context The ESLint rule context (needed for computed-key evaluation).
 * @param property The property to read the key from.
 * @returns The statically resolved key, or `null` when it cannot be determined as a string.
 */
export function getStaticPropertyName(context: RuleContext, property: TSESTree.Property): string | null {
  const key = Extract.unwrap(property.key);
  if (property.computed) {
    const staticValue = getStaticValue(key, context.sourceCode.getScope(key));
    return typeof staticValue?.value === "string" ? staticValue.value : null;
  }
  if (Check.isIdentifier(key)) return key.name;
  if (key.type === AST.Literal && typeof key.value === "string") return key.value;
  return null;
}

/**
 * Check whether a property key is statically known.
 *
 * Non-computed keys are always known. A computed key is known when it can be
 * statically evaluated, regardless of whether the resulting value is a string
 * (ex: `[1]` is statically known not to be `"key"`).
 * @param context The ESLint rule context (needed for computed-key evaluation).
 * @param property The property to check.
 * @returns `true` if the key can be statically determined.
 */
export function isStaticPropertyKey(context: RuleContext, property: TSESTree.Property): boolean {
  if (!property.computed) return true;
  const key = Extract.unwrap(property.key);
  return getStaticValue(key, context.sourceCode.getScope(key)) != null;
}

/**
 * Resolve a spread argument to an object expression, following identifier aliases.
 *
 * This mirrors `getStaticValue`'s identifier tracking: an identifier is resolved to
 * its initializer repeatedly until a non-identifier node is reached. `seen` guards
 * against circular references and is shared with the caller for cycle detection.
 * @param context The ESLint rule context (needed for variable resolution).
 * @param argument The spread argument expression to resolve.
 * @param seen Set of nodes already visited during the current lookup.
 * @returns The resolved object expression, or `null` when the argument does not resolve to one.
 */
export function resolveObjectExpression(context: RuleContext, argument: TSESTree.Expression, seen: Set<TSESTree.Node>): TSESTree.ObjectExpression | null {
  if (argument.type === AST.ObjectExpression) {
    return seen.has(argument) ? null : argument;
  }
  if (!Check.isIdentifier(argument)) return null;

  let initNode: TSESTree.Node | null = resolve(context, argument);
  while (initNode != null && Check.isIdentifier(initNode) && !seen.has(initNode)) {
    seen.add(initNode);
    initNode = resolve(context, initNode);
  }
  if (initNode?.type !== AST.ObjectExpression || seen.has(initNode)) return null;
  return initNode;
}

/**
 * Find a statically named property in an object expression.
 *
 * Properties are walked **in reverse** so that later entries win, matching
 * JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`). Nested
 * `SpreadElement`s are resolved through {@link resolveObjectExpression} and
 * searched recursively; `seen` guards against circular references.
 * @param context The ESLint rule context (needed for computed-key and variable resolution).
 * @param object The object expression to search.
 * @param name The property name to look for.
 * @param seen Internal set of already-visited nodes (cycle guard).
 * @returns The matching `Property` node, or `null` when the key is not found.
 */
export function findObjectProperty(
  context: RuleContext,
  object: TSESTree.ObjectExpression,
  name: string,
  seen: Set<TSESTree.Node> = new Set(),
): TSESTree.Property | null {
  if (seen.has(object)) return null;
  seen.add(object);

  const { properties } = object;
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property == null) continue;
    if (property.type === AST.Property) {
      if (getStaticPropertyName(context, property) === name) return property;
      continue;
    }
    const nested = resolveObjectExpression(context, property.argument, seen);
    if (nested == null) continue;
    const found = findObjectProperty(context, nested, name, seen);
    if (found != null) return found;
  }
  return null;
}

/**
 * Check whether an object expression (or any nested spread inside it) provides
 * one of the given statically known property names.
 *
 * Properties are walked in reverse so that later entries win, and nested
 * `SpreadElement`s are resolved through {@link resolveObjectExpression}.
 * @param context The ESLint rule context (needed for computed-key and variable resolution).
 * @param object The object expression to search.
 * @param names The property names to look for.
 * @param seen Internal set of already-visited nodes (cycle guard).
 * @returns `true` if any of the names is provided by the object or a nested spread.
 */
export function hasObjectProperty(
  context: RuleContext,
  object: TSESTree.ObjectExpression,
  names: ReadonlySet<string>,
  seen: Set<TSESTree.Node> = new Set(),
): boolean {
  if (seen.has(object)) return false;
  seen.add(object);

  const { properties } = object;
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property == null) continue;
    if (property.type === AST.Property) {
      const name = getStaticPropertyName(context, property);
      if (name != null && names.has(name)) return true;
      continue;
    }
    const nested = resolveObjectExpression(context, property.argument, seen);
    if (nested != null && hasObjectProperty(context, nested, names, seen)) return true;
  }
  return false;
}
