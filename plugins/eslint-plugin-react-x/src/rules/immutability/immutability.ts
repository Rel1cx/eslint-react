import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";
import { MUTATING_ARRAY_METHODS } from "./lib";

export const RULE_NAME = "immutability";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutatingArrayMethod"
  | "mutatingAssignment";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against mutating props, state, and other values that are immutable.",
    },
    messages: {
      mutatingArrayMethod:
        "Do not call '{{method}}()' on '{{name}}'. Props and state are immutable — create a new array instead.",
      mutatingAssignment:
        "Do not mutate '{{name}}' directly. Props and state are immutable — create a new object instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);

  /**
   * Violations accumulated while traversing. Each entry records the node to
   * report and the enclosing function so we can filter at Program:exit.
   */
  const violations: {
    data: Record<string, string>;
    func: TSESTreeFunction;
    messageId: MessageID;
    node: TSESTree.Node;
    /**
     * When the violation originates from a props parameter, this is the
     * function where that parameter was declared. It must be verified as a
     * component or hook at Program:exit time.
     */
    propsDefiningFunc?: TSESTreeFunction;
  }[] = [];

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function isUseStateCall(node: TSESTree.Node) {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  /**
   * Return true when `id` is the *value* variable (index 0) produced by a
   * `useState(…)` call, i.e. the first element of `const [value, setter] = useState(…)`.
   * @param id The identifier to check. May be a reference to the state variable, e.g. used inside an event handler nested in the component body — scope resolution will trace it back to the original declaration.
   * @returns True if `id` is a state variable, false otherwise.
   */
  function isStateValue(id: TSESTree.Identifier): boolean {
    const initNode = resolve(context, id);

    if (initNode == null || initNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(initNode)) return false;

    // If the useState result is not destructured into an array, the entire
    // result is a state container — treat it as a state value.
    const declarator = initNode.parent;
    if (!("id" in declarator) || declarator.id?.type !== AST.ArrayPattern) {
      return true;
    }

    // The identifier must be the first element of the destructuring (the value,
    // not the setter).
    const idx = declarator.id.elements.findIndex(
      (el) => el?.type === AST.Identifier && el.name === id.name,
    );
    return idx === 0;
  }

  /**
   * Return the function node when `id` is a direct (non-destructured) props
   * parameter at position 0 of any ancestor function; otherwise return `null`.
   *
   * The caller must later verify (at Program:exit) that the returned function
   * is actually a component or hook — event handler parameters share the same
   * syntactic shape but should **not** be treated as React props.
   *
   * Uses scope resolution so that references to `props` inside nested arrow
   * functions (ex: event handlers) are correctly traced back to the component
   * parameter, e.g.:
   *
   *   function Component(props) {        // ← props defined here
   *     const handleClick = () => {
   *       props.items.push(4); // ← props resolved via scope to Component's param
   *     };
   *   }
   * @param id The identifier to check. May be a reference to the props parameter, e.g. used inside an event handler nested in the component body — scope resolution will trace it back to the original declaration.
   * @returns The function node where `id` is the first parameter, or `null`.
   */
  function getPropsDefiningFunction(id: TSESTree.Identifier): TSESTreeFunction | null {
    const scope = context.sourceCode.getScope(id);
    const variable = findVariable(scope, id);
    if (variable == null) return null;
    for (const def of variable.defs) {
      if (def.type !== DefinitionType.Parameter) continue;
      if (!Check.isFunction(def.node)) continue;
      const fn = def.node as TSESTreeFunction;
      const firstParam = fn.params.at(0);
      if (firstParam?.type === AST.Identifier && firstParam.name === id.name) {
        return fn;
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Visitors
  // ---------------------------------------------------------------------------

  return merge(
    hc.visitor,
    fc.visitor,
    {
      /**
       * Detect `state.push(…)`, `state.sort()`, etc.
       *
       * Pattern:
       *   CallExpression
       *     callee: MemberExpression
       *       object: <state or props identifier>
       *       property: <mutating method name>
       * @param node The CallExpression node to analyze.
       */
      CallExpression(node: TSESTree.CallExpression) {
        const callee = Extract.unwrap(node.callee);
        if (callee.type !== AST.MemberExpression) return;
        const { object, property } = callee;
        if (property.type !== AST.Identifier) return;
        if (!MUTATING_ARRAY_METHODS.has(property.name)) return;

        // Find the root identifier (handles `state`, `state.nested`, etc.)
        const rootId = Extract.getRootIdentifier(object);
        if (rootId == null) return;
        if (rootId.name === "draft") return;

        const enclosingFn = Traverse.findParent(node, Check.isFunction);
        if (enclosingFn == null) return;

        const isState = isStateValue(rootId);
        const propsDefiningFunc = !isState ? getPropsDefiningFunction(rootId) : null;
        if (!isState && propsDefiningFunc == null) return;

        violations.push({
          data: {
            name: context.sourceCode.getText(object),
            method: property.name,
          },
          func: enclosingFn,
          messageId: "mutatingArrayMethod",
          node,
          ...(propsDefiningFunc != null ? { propsDefiningFunc } : {}),
        });
      },

      /**
       * Detect `state.foo = bar`, `state.foo.bar = baz`, `props.foo = bar`.
       *
       * Pattern:
       *   AssignmentExpression
       *     left: MemberExpression
       *       object: <state or props identifier (or deeper chain)>
       * @param node The AssignmentExpression node to analyze.
       */
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.left.type !== AST.MemberExpression) return;
        const rootId = Extract.getRootIdentifier(node.left);
        if (rootId == null) return;
        if (rootId.name === "draft") return;

        const enclosingFn = Traverse.findParent(node, Check.isFunction);
        if (enclosingFn == null) return;

        const isState = isStateValue(rootId);
        const propsDefiningFunc = !isState ? getPropsDefiningFunction(rootId) : null;
        if (!isState && propsDefiningFunc == null) return;

        violations.push({
          data: {
            name: context.sourceCode.getText(node.left.object),
          },
          func: enclosingFn,
          messageId: "mutatingAssignment",
          node,
          ...(propsDefiningFunc != null ? { propsDefiningFunc } : {}),
        });
      },
      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];

        for (const { data, func, messageId, node, propsDefiningFunc } of violations) {
          // Walk up the function chain to find a component or hook boundary
          let current: TSESTreeFunction | null = func;
          let insideComponentOrHook = false;
          while (current != null) {
            if (funcs.some((f) => f.node === current)) {
              insideComponentOrHook = true;
              break;
            }
            current = Traverse.findParent(current, Check.isFunction);
          }

          if (!insideComponentOrHook) continue;

          // For props-based violations, verify that the function where the
          // parameter was declared is itself a component or hook. This prevents
          // false positives on event handler parameters (e.g. `e.currentTarget`).
          if (propsDefiningFunc != null) {
            if (!funcs.some((f) => f.node === propsDefiningFunc)) continue;
          }

          context.report({ data, messageId, node });
        }
      },
    },
  );
}
