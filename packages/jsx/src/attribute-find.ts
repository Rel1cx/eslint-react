import { Extract, type TSESTreeJSXAttributeLike, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getAttributeName } from "./attribute-name";

/**
 * Find a JSX attribute (or a spread attribute containing the property) by name.
 *
 * Returns the last matching attribute to mirror React's behavior where later props win.
 * Spread attributes are resolved when possible: if the spread argument is an identifier
 * that resolves to an object expression, the object's properties are searched for a
 * matching key (see {@link findSpreadProperty}).
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
 * Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor, optionally matching a predicate.
 * @param node The starting node for the upward search.
 * @param test Optional predicate to filter candidate `JSXAttribute` nodes.
 * @returns The first matching `JSXAttribute` ancestor, or `undefined` when none is found.
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
 * checks), {@link resolveAttribute}, and {@link resolveAttributeValue} (named value extraction):
 *
 * - An `Identifier` argument is resolved to its initializer via variable
 *   resolution, following alias chains (`const b = a`); an `ObjectExpression`
 *   argument is searched directly. TypeScript expression wrappers are unwrapped.
 * - Properties are walked **in reverse** so that later entries win, matching
 *   JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
 * - Nested `SpreadElement`s (identifiers or inline object expressions) are
 *   searched recursively; a `seen` set guards against circular references.
 * - Statically known primitive keys use JavaScript string-key coercion, including
 *   numeric and computed keys (ex: `{ ["class" + "Name"]: 1 }`). Symbol keys and
 *   object/function key coercion are not supported by this string-name lookup.
 * @param context The ESLint rule context (needed for variable resolution).
 * @param argument The spread argument expression to search.
 * @param name The property name to look for.
 * @param seen Internal set of already-visited nodes (cycle guard).
 * @returns The matching `Property` node, or `undefined` when the key is not found.
 */
export function findSpreadProperty(
  context: RuleContext,
  argument: TSESTree.Expression,
  name: string,
  seen: Set<TSESTree.Node> = new Set(),
): TSESTree.Property | undefined {
  let node: TSESTree.Node = Extract.unwrap(argument);
  while (node.type === AST.Identifier && !seen.has(node)) {
    seen.add(node);
    const initializer = resolve(context, node);
    if (initializer == null) return undefined;
    node = Extract.unwrap(initializer);
  }
  if (node.type !== AST.ObjectExpression || seen.has(node)) return undefined;
  seen.add(node);

  const { properties } = node;
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property == null) continue;
    if (property.type === AST.Property) {
      if (Extract.getPropertyName(property, "max", context.sourceCode.getScope(property.key)) === name) return property;
      continue;
    }
    const found = findSpreadProperty(context, property.argument, name, seen);
    if (found != null) return found;
  }
  return undefined;
}
