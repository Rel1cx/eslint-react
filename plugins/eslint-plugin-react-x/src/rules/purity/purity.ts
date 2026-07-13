import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { IMPURE_CTORS, IMPURE_FUNCS, resolveBuiltinObjectName } from "./lib";

export const RULE_NAME = "purity";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that components and hooks are pure by checking that they do not call known-impure functions during render.",
    },
    messages: {
      default: "Do not call '{{name}}' during render. Components and hooks must be pure. Move this call into an event handler, effect, or state initializer.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
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
            const globalThisImpure = IMPURE_FUNCS.get("globalThis");
            if (globalThisImpure == null || !globalThisImpure.has(builtinName)) return;
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
            const objectImpure = IMPURE_FUNCS.get(objectName);
            if (objectImpure == null || !objectImpure.has(propertyName)) return;
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
