import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
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
  | { kind: "shallow-copy"; name: string; original: string };

/**
 * Classify whether a variable ultimately holds a value that must be treated as
 * immutable: a component's props, a state value returned from `useState`-like or
 * `useReducer` calls, or a shallow copy (spread literal) of either.
 * @param context The rule context.
 * @param variable The variable to classify.
 * @param seen Variables already visited during spread recursion.
 * @returns The frozen origin, or `null` when the variable is not derived from one.
 */
export function classifyFrozenOrigin(context: RuleContext, variable: Scope.Variable, seen: Set<Scope.Variable> = new Set()): FrozenOrigin | null {
  if (seen.has(variable)) return null;
  seen.add(variable);
  const origin = resolveVariableOrigin(context, variable);
  const def = origin.defs.length === 1 ? origin.defs[0] : null;
  if (def == null) return null;
  if (isComponentPropsDefinition(context, def)) {
    return { kind: "props", name: origin.name };
  }
  if (def.type !== DefinitionType.Variable) return null;
  const init = def.node.init == null ? null : Extract.unwrap(def.node.init);
  if (init == null) return null;
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
        const source = findVariable(context.sourceCode.getScope(argument), argument);
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
