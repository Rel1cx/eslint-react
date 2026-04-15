import { Check, Extract, Traverse } from "@eslint-react/ast";
import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { IMPURE_CTORS, IMPURE_FUNCS } from "./lib";

import { createRule } from "../../utils";

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

export function create(context: RuleContext<MessageID, []>) {
  const hCollector = core.getHookCollector(context);
  const cCollector = core.getFunctionComponentCollector(context);
  const cEntries: {
    func: TSESTreeFunction;
    node: TSESTree.CallExpression;
  }[] = [];
  const nEntries: {
    func: TSESTreeFunction;
    node: TSESTree.NewExpression;
  }[] = [];
  return merge(
    hCollector.visitor,
    cCollector.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        const expr = Extract.unwrap(node.callee);
        switch (true) {
          case expr.type === AST.Identifier: {
            if (!IMPURE_FUNCS.get("globalThis")?.has(expr.name)) return;
            const func = Traverse.findParent(node, Check.isFunction);
            if (func == null) return;
            cEntries.push({ func, node });
            break;
          }
          case expr.type === AST.MemberExpression
            && expr.object.type === AST.Identifier
            && expr.property.type === AST.Identifier: {
            const objectName = expr.object.name;
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
        if (!IMPURE_CTORS.has(expr.name)) return;
        // `new Date(arg)` with arguments is pure (deterministic),
        // only `new Date()` without arguments is impure (depends on current time).
        if (expr.name === "Date" && node.arguments.length > 0) return;
        const func = Traverse.findParent(node, Check.isFunction);
        if (func == null) return;
        nEntries.push({ func, node });
      },
      "Program:exit"(node) {
        const comps = cCollector.api.getAllComponents(node);
        const hooks = hCollector.api.getAllHooks(node);
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
