import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import {
  IMPURE_CTORS,
  IMPURE_FUNCS,
  type RuleContext,
  type RuleFeature,
  defineRuleListener,
} from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

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
  const hCollector = core.useHookCollector(context);
  const cCollector = core.useComponentCollector(context);
  const cExprs: {
    node: TSESTree.CallExpression;
    func: ast.TSESTreeFunction;
  }[] = [];
  const nExprs: {
    node: TSESTree.NewExpression;
    func: ast.TSESTreeFunction;
  }[] = [];
  return defineRuleListener(
    hCollector.visitor,
    cCollector.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (node.callee.type !== AST.MemberExpression) return;
        const expr = ast.getUnderlyingExpression(node.callee);
        if (expr.type !== AST.MemberExpression) return;
        if (expr.object.type !== AST.Identifier) return;
        if (expr.property.type !== AST.Identifier) return;
        const objectName = expr.object.name;
        const propertyName = expr.property.name;
        if (!IMPURE_FUNCS.get(objectName)?.has(propertyName)) return;
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        cExprs.push({ node, func });
      },
      NewExpression(node: TSESTree.NewExpression) {
        const expr = ast.getUnderlyingExpression(node.callee);
        if (expr.type !== AST.Identifier) return;
        if (!IMPURE_CTORS.has(expr.name)) return;
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        nExprs.push({ node, func });
      },
      "Program:exit"(node) {
        const components = cCollector.ctx.getAllComponents(node);
        const hooks = hCollector.ctx.getAllHooks(node);
        const funcs = [...components, ...hooks];
        for (const { node, func } of [...cExprs, ...nExprs]) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "default",
            node,
            data: {
              name: context.sourceCode.getText(node),
            },
          });
        }
      },
    },
  );
}
