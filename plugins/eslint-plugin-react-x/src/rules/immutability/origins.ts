import { Check, Extract } from "@eslint-react/ast";
import type { RichContext } from "@eslint-react/core";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import { getStateHookName, isComponentPropsDefinition, isNodeWithin, resolveVariableOrigin } from "./lib";

/**
 * An origin that must be treated as immutable, resolved from a mutated variable.
 */
export type FrozenOrigin =
  | { kind: "props"; name: string }
  | { kind: "state"; name: string; hook: string }
  | { kind: "shallow-copy"; name: string; original: string }
  | { kind: "iterator"; name: string; original: string };

/**
 * Classify whether a variable ultimately holds a value that must be treated as
 * immutable: a component's props, a state value returned from `useState`-like or
 * `useReducer` calls, a shallow copy (spread literal) of either, or a `for...of`
 * iterator variable whose iterated collection resolves to one of those.
 * @param context The rich rule context.
 * @param variable The variable to classify.
 * @param seen Variables already visited during spread/iterator recursion.
 * @returns The frozen origin, or `null` when the variable is not derived from one.
 */
export function classifyFrozenOrigin(
  context: RichContext,
  variable: Scope.Variable,
  seen: Set<Scope.Variable> = new Set(),
): FrozenOrigin | null {
  if (seen.has(variable)) return null;
  seen.add(variable);
  const origin = resolveVariableOrigin(context, variable);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def == null) return null;
  if (isComponentPropsDefinition(context, def)) {
    return { kind: "props", name: origin.name };
  }
  if (def.type !== DefinitionType.Variable) return null;
  // `for (const item of items)`: the iterator variable is bound to each element
  // of the iterated collection, so it shares the collection's frozen origin.
  // The right side is traced through its root identifier, so member-expression
  // collections (`for (const item of props.items)`) resolve to their root.
  if (def.node.init == null) {
    const loop = def.node.parent.parent;
    if (loop.type !== AST.ForOfStatement || loop.left !== def.node.parent) return null;
    const root = Extract.getIdentifierAt(loop.right, 0);
    if (root == null) return null;
    const source = findVariable(context.src.getScope(root), root);
    if (source == null) return null;
    const inner = classifyFrozenOrigin(context, source, seen);
    return inner == null ? null : { kind: "iterator", name: origin.name, original: inner.name };
  }
  const init = Extract.unwrap(def.node.init);
  switch (init.type) {
    // `const [state, setState] = useState(...)`: only the element at index 0 is the state value.
    case AST.CallExpression: {
      const hook = getStateHookName(context, init);
      if (hook == null) return null;
      if (def.node.id.type !== AST.ArrayPattern) return null;
      const first = def.node.id.elements.at(0);
      if (first == null || !isNodeWithin(def.name, first)) return null;
      return { kind: "state", name: origin.name, hook };
    }
    // `const copy = { ...state }` / `const copy = [...state]`: the copy's own
    // top-level slots are new, but nested values still reference the original.
    case AST.ArrayExpression:
    case AST.ObjectExpression: {
      const elements: (TSESTree.Node | null)[] = init.type === AST.ObjectExpression ? init.properties : init.elements;
      for (const element of elements) {
        if (element?.type !== AST.SpreadElement) continue;
        const argument = Extract.unwrap(element.argument);
        if (!Check.isIdentifier(argument)) continue;
        const src = context.src;
        const source = findVariable(src.getScope(argument), argument);
        if (source == null) continue;
        const inner = classifyFrozenOrigin(context, source, seen);
        if (inner != null) return { kind: "shallow-copy", name: origin.name, original: inner.name };
      }
      return null;
    }
    default:
      return null;
  }
}
