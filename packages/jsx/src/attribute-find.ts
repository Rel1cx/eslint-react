import { type TSESTreeJSXAttributeLike, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getAttributeName } from "./attribute-name";

/**
 * Find a JSX attribute (or spread attribute containing the property) by name on a given element.
 *
 * Returns the last matching attribute to mirror React's behavior where later props win,
 * or `undefined` when the attribute is not present.
 *
 * Spread attributes are resolved when possible: if the spread argument is an identifier
 * that resolves to an object expression, the object's properties are searched for a matching key.
 * Nested object expressions and nested spread identifiers are also resolved
 * (see {@link findSpreadProperty}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look for (ex: "className").
 * @returns The matching `JSXAttribute` or `JSXSpreadAttribute`, or `undefined` when not found.
 */
export function findAttribute(context: RuleContext, element: TSESTree.JSXElement, name: string): TSESTreeJSXAttributeLike | undefined {
  return element.openingElement.attributes.findLast((attr) => {
    if (attr.type === AST.JSXAttribute) {
      return getAttributeName(attr) === name;
    }
    return findSpreadProperty(context, attr.argument, name) != null;
  });
}

/**
 * Walk up the AST from `node` to find the nearest ancestor that is a `JSXAttribute`
 * and (optionally) passes a predicate.
 *
 * This is useful when a rule visitor enters a deeply nested node (ex: a `Literal`
 * inside an expression container) and needs to know which JSX attribute it belongs to.
 * @param node The starting node for the upward search.
 * @param test Optional predicate to filter candidate `JSXAttribute` nodes. When omitted every `JSXAttribute` ancestor matches.
 * @returns The first matching `JSXAttribute` ancestor, or `undefined` if none is found before reaching the root.
 */
export function findParentAttribute(node: TSESTree.Node, test: (node: TSESTree.JSXAttribute) => boolean = () => true): TSESTree.JSXAttribute | undefined {
  const guard = (n: TSESTree.Node): n is TSESTree.JSXAttribute => {
    return n.type === AST.JSXAttribute && test(n);
  };
  return Traverse.findParent(node, guard) ?? undefined;
}

/**
 * Find the `Property` node that provides a given key inside a spread argument.
 *
 * This is the single resolution routine shared by {@link findAttribute} (existence
 * checks) and the `spreadProps` variant of `resolveAttributeValue` (value extraction):
 *
 * - An `Identifier` argument is resolved to its initializer via variable
 *   resolution; an `ObjectExpression` argument is searched directly.
 * - Properties are walked **in reverse** so that later entries win, matching
 *   JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
 * - Nested `SpreadElement`s (identifiers or inline object expressions) are
 *   searched recursively; a `seen` set guards against circular references.
 * - Computed keys are skipped (they cannot be matched by name statically);
 *   plain identifier keys and string literal keys are both matched.
 * @param context The ESLint rule context (needed for variable resolution).
 * @param argument The spread argument expression to search.
 * @param name The property name to look for.
 * @param seen Internal set of already-visited object expressions (cycle guard).
 * @returns The matching `Property` node, or `undefined` when the key is not found.
 */
export function findSpreadProperty(
  context: RuleContext,
  argument: TSESTree.Expression,
  name: string,
  seen: Set<TSESTree.Node> = new Set(),
): TSESTree.Property | undefined {
  let objectExpression: TSESTree.ObjectExpression | undefined;
  if (argument.type === AST.Identifier) {
    const initNode = resolve(context, argument);
    if (initNode?.type === AST.ObjectExpression) {
      objectExpression = initNode;
    }
  } else if (argument.type === AST.ObjectExpression) {
    objectExpression = argument;
  }
  if (objectExpression == null || seen.has(objectExpression)) return undefined;
  seen.add(objectExpression);

  const { properties } = objectExpression;
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property == null) continue;
    if (property.type === AST.Property) {
      if (property.computed) continue;
      const { key } = property;
      if (key.type === AST.Identifier && key.name === name) return property;
      if (key.type === AST.Literal && key.value === name) return property;
      continue;
    }
    const found = findSpreadProperty(context, property.argument, name, seen);
    if (found != null) return found;
  }
  return undefined;
}
