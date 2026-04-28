import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { IMPURE_CTORS, IMPURE_FUNCS } from "./lib";

import { createRule } from "../../utils/create-rule";

export const RULE_NAME = "purity";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates that components and hooks are pure by checking that they do not call known-impure functions during render.",
    },
    messages: {
      default:
        "Do not call '{{name}}' during render. Components and hooks must be pure. Move this call into an event handler, effect, or state initializer.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

/**
 * Recursively resolve an identifier to the root builtin global object name.
 * Follows simple assignment chains like `const M = Math` or `const w = window`.
 * Returns `null` if the identifier is locally defined (parameter, import, function declaration, etc.)
 * or resolves to a non-builtin source.
 * @param context - The rule context.
 * @param node - The identifier node to resolve.
 * @param visited - A set of already visited identifier names to prevent infinite loops.
 */
function resolveBuiltinObjectName(
  context: RuleContext,
  node: TSESTree.Identifier,
  visited = new Set<string>(),
): string | null {
  if (visited.has(node.name)) return null;
  visited.add(node.name);

  const scope = context.sourceCode.getScope(node);
  const variable = findVariable(scope, node);

  // No variable found -> treat as global
  if (variable == null) return node.name;

  const def = variable.defs[0];
  if (def == null) return node.name; // implicit global

  if (def.type === DefinitionType.ImplicitGlobalVariable) {
    return node.name;
  }

  if (def.type === DefinitionType.Variable && def.node.init != null) {
    const init = Extract.unwrap(def.node.init);
    if (init.type === AST.Identifier) {
      return resolveBuiltinObjectName(context, init, visited);
    }
    if (init.type === AST.MemberExpression) {
      const rootId = Extract.getRootIdentifier(init);
      if (rootId != null) {
        return resolveBuiltinObjectName(context, rootId, visited);
      }
    }
  }

  // Other definitions (Parameter, FunctionName, ImportBinding, etc.) are not builtins
  return null;
}

export function create(context: RuleContext<MessageID, []>) {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);
  const cEntries: {
    func: TSESTreeFunction;
    node: TSESTree.CallExpression;
  }[] = [];
  const nEntries: {
    func: TSESTreeFunction;
    node: TSESTree.NewExpression;
  }[] = [];
  return merge(
    hc.visitor,
    fc.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        const expr = Extract.unwrap(node.callee);
        switch (true) {
          case expr.type === AST.Identifier: {
            const builtinName = resolveBuiltinObjectName(context, expr);
            if (builtinName == null) return;
            if (!IMPURE_FUNCS.get("globalThis")?.has(builtinName)) return;
            const func = Traverse.findParent(node, Check.isFunction);
            if (func == null) return;
            cEntries.push({ func, node });
            break;
          }
          case expr.type === AST.MemberExpression
            && expr.property.type === AST.Identifier: {
            const rootId = Extract.getRootIdentifier(expr.object);
            if (rootId == null) return;
            const objectName = resolveBuiltinObjectName(context, rootId);
            if (objectName == null) return;
            const propertyName = expr.property.name;
            if (!IMPURE_FUNCS.get(objectName)?.has(propertyName)) return;
            const func = Traverse.findParent(node, Check.isFunction);
            if (func == null) return;
            cEntries.push({ func, node });
            break;
          }
        }
      },
      NewExpression(node: TSESTree.NewExpression) {
        const expr = Extract.unwrap(node.callee);
        if (expr.type !== AST.Identifier) return;
        const builtinName = resolveBuiltinObjectName(context, expr);
        if (builtinName == null) return;
        if (!IMPURE_CTORS.has(builtinName)) return;
        // `new Date(arg)` with arguments is pure (deterministic),
        // only `new Date()` without arguments is impure (depends on current time).
        if (builtinName === "Date" && node.arguments.length > 0) return;
        const func = Traverse.findParent(node, Check.isFunction);
        if (func == null) return;
        nEntries.push({ func, node });
      },
      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];
        for (const { func, node } of [...cEntries, ...nEntries]) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            data: {
              name: context.sourceCode.getText(node),
            },
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
