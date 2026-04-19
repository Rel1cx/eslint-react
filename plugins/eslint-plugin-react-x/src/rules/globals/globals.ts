/* eslint-disable jsdoc/require-param */
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";
import { MUTATING_ARRAY_METHODS } from "./lib";

export const RULE_NAME = "globals";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutatingGlobal"
  | "mutatingGlobalArrayMethod"
  | "mutatingGlobalProperty";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render.",
    },
    messages: {
      mutatingGlobal:
        "Do not mutate '{{name}}' during render. Global variables exist outside React's control and make rendering impure.",
      mutatingGlobalArrayMethod:
        "Do not call '{{method}}()' on '{{name}}' during render. Mutating global arrays during render makes rendering impure.",
      mutatingGlobalProperty:
        "Do not mutate '{{name}}' during render. Modifying global objects during render makes rendering impure.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);

  const violations: {
    data: Record<string, string>;
    func: TSESTreeFunction;
    messageId: MessageID;
    node: TSESTree.Node;
  }[] = [];

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /**
   * Return true when `id` refers to a variable defined in the global or module
   * scope (i.e. outside any function), or when it has no known definition.
   */
  function isGlobalOrModuleVariable(id: TSESTree.Identifier): boolean {
    const scope = context.sourceCode.getScope(id);
    const variable = findVariable(scope, id);
    if (variable == null) return true;
    if (variable.defs.length === 0) return true;
    const scopeType = variable.scope.type;
    return scopeType === "global" || scopeType === "module";
  }

  /**
   * Return the nearest enclosing function for `node`.
   */
  function getEnclosingFunction(node: TSESTree.Node): TSESTreeFunction | null {
    return Traverse.findParent(node, Check.isFunction);
  }

  /**
   * Record a violation that will be filtered at Program:exit.
   */
  function recordViolation(
    node: TSESTree.Node,
    messageId: MessageID,
    data: Record<string, string>,
  ) {
    const func = getEnclosingFunction(node);
    if (func == null) return;
    violations.push({ data, func, messageId, node });
  }

  // ---------------------------------------------------------------------------
  // Visitors
  // ---------------------------------------------------------------------------

  return merge(
    hc.visitor,
    fc.visitor,
    {
      /**
       * Detect `renderCount++`, `renderCount--`
       */
      UpdateExpression(node: TSESTree.UpdateExpression) {
        const arg = Extract.unwrap(node.argument);
        if (arg.type !== AST.Identifier) return;
        if (!isGlobalOrModuleVariable(arg)) return;
        recordViolation(node, "mutatingGlobal", {
          name: arg.name,
        });
      },

      /**
       * Detect `renderCount = 1`, `window.currentUser = id`, `cache[id] = value`
       */
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        const left = Extract.unwrap(node.left);

        if (left.type === AST.Identifier) {
          // Direct assignment to a global/module variable
          if (!isGlobalOrModuleVariable(left)) return;
          recordViolation(node, "mutatingGlobal", {
            name: left.name,
          });
          return;
        }

        if (left.type === AST.MemberExpression) {
          // Property assignment on a global/module variable
          const rootId = Extract.getRootIdentifier(left);
          if (rootId == null) return;
          if (!isGlobalOrModuleVariable(rootId)) return;
          recordViolation(node, "mutatingGlobalProperty", {
            name: context.sourceCode.getText(left),
          });
        }
      },

      /**
       * Detect `events.push(event)`, `cache.sort()`, etc.
       */
      CallExpression(node: TSESTree.CallExpression) {
        if (node.callee.type !== AST.MemberExpression) return;
        const { object, property } = node.callee;
        if (property.type !== AST.Identifier) return;
        if (!MUTATING_ARRAY_METHODS.has(property.name)) return;

        const rootId = Extract.getRootIdentifier(object);
        if (rootId == null) return;
        if (!isGlobalOrModuleVariable(rootId)) return;

        recordViolation(node, "mutatingGlobalArrayMethod", {
          name: rootId.name,
          method: property.name,
        });
      },

      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];

        for (const { data, func, messageId, node } of violations) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({ data, messageId, node });
        }
      },
    },
  );
}
