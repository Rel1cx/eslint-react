import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { findVariable, getVariableInitializer } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "immutability";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutatingArrayMethod"
  | "mutatingAssignment";

/**
 * Array methods that mutate the array in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
const MUTATING_ARRAY_METHODS = new Set([
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

  const hCollector = core.useHookCollector(context);
  const cCollector = core.useComponentCollector(context);

  /**
   * Violations accumulated while traversing. Each entry records the node to
   * report and the enclosing function so we can filter at Program:exit.
   */
  const violations: {
    data: Record<string, string>;
    func: ast.TSESTreeFunction;
    messageId: MessageID;
    node: TSESTree.Node;
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
    const scope = context.sourceCode.getScope(id);
    const variable = findVariable(id, scope);
    const initNode = getVariableInitializer(variable, 0);

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
   * Return true when `id` is a direct (non-destructured) props parameter at
   * position 0 of any ancestor function.
   *
   * Uses scope resolution so that references to `props` inside nested arrow
   * functions (e.g. event handlers) are correctly traced back to the component
   * parameter, e.g.:
   *
   *   function Component(props) {        // ← props defined here
   *     const handleClick = () => {
   *       props.items.push(4); // ← props resolved via scope to Component's param
   *     };
   *   }
   * @param id The identifier to check. May be a reference to the props parameter, e.g. used inside an event handler nested in the component body — scope resolution will trace it back to the original declaration.
   * @returns True if `id` is a props parameter, false otherwise.
   */
  function isPropsObject(id: TSESTree.Identifier): boolean {
    const scope = context.sourceCode.getScope(id);
    const variable = findVariable(id, scope);
    if (variable == null) return false;
    for (const def of variable.defs) {
      if (def.type !== DefinitionType.Parameter) continue;
      if (!ast.isFunction(def.node)) continue;
      const firstParam = (def.node as ast.TSESTreeFunction).params.at(0);
      return firstParam?.type === AST.Identifier && firstParam.name === id.name;
    }
    return false;
  }

  // ---------------------------------------------------------------------------
  // Visitors
  // ---------------------------------------------------------------------------

  return defineRuleListener(
    hCollector.visitor,
    cCollector.visitor,
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
        if (node.callee.type !== AST.MemberExpression) return;
        const { object, property } = node.callee;
        if (property.type !== AST.Identifier) return;
        if (!MUTATING_ARRAY_METHODS.has(property.name)) return;

        // Find the root identifier (handles `state`, `state.nested`, etc.)
        const rootId = ast.getRootIdentifier(object);
        if (rootId == null) return;
        if (rootId.name === "draft") return;

        const enclosingFn = ast.findParentNode(node, ast.isFunction);
        if (enclosingFn == null) return;

        const isState = isStateValue(rootId);
        const isProps = isPropsObject(rootId);
        if (!isState && !isProps) return;

        violations.push({
          data: {
            name: context.sourceCode.getText(object),
            method: property.name,
          },
          func: enclosingFn,
          messageId: "mutatingArrayMethod",
          node,
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
        const rootId = ast.getRootIdentifier(node.left);
        if (rootId == null) return;
        if (rootId.name === "draft") return;

        const enclosingFn = ast.findParentNode(node, ast.isFunction);
        if (enclosingFn == null) return;

        const isState = isStateValue(rootId);
        const isProps = isPropsObject(rootId);
        if (!isState && !isProps) return;

        violations.push({
          data: {
            name: context.sourceCode.getText(node.left.object),
          },
          func: enclosingFn,
          messageId: "mutatingAssignment",
          node,
        });
      },

      /**
       * At the end of the program, filter collected violations to only those
       * that appear inside a component or hook function, then report them.
       * @param program The Program node of the entire file.
       */
      "Program:exit"(program) {
        const components = cCollector.ctx.getAllComponents(program);
        const hooks = hCollector.ctx.getAllHooks(program);
        const componentAndHookFns = new Set([
          ...components.map((c) => c.node),
          ...hooks.map((h) => h.node),
        ]);

        for (const { data, func, messageId, node } of violations) {
          // Walk up the function chain to find a component or hook boundary
          let current: ast.TSESTreeFunction | unit = func;
          let insideComponentOrHook = false;
          while (current != null) {
            if (componentAndHookFns.has(current)) {
              insideComponentOrHook = true;
              break;
            }
            current = ast.findParentNode(current, ast.isFunction);
          }

          if (!insideComponentOrHook) continue;

          context.report({ data, messageId, node });
        }
      },
    },
  );
}
