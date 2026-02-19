import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "unsupported-syntax";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "eval"
  | "with"
  | "iife";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against syntax that React Compiler does not support.",
    },
    messages: {
      eval:
        "Do not use 'eval' inside components or hooks. 'eval' cannot be statically analyzed and is not supported by React Compiler.",
      with:
        "Do not use 'with' statements inside components or hooks. 'with' changes scope dynamically and is not supported by React Compiler.",
      iife:
        "Do not use immediately-invoked function expressions in JSX. IIFEs will not be optimized by React Compiler.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function isEvalCall(node: TSESTree.CallExpression) {
  return node.callee.type === AST.Identifier && node.callee.name === "eval";
}

function isIifeCall(node: ast.TSESTreeFunction) {
  return node.parent.type === AST.CallExpression && node.parent.callee === node;
}

export function create(context: RuleContext<MessageID, []>) {
  const hCollector = core.useHookCollector(context);
  const cCollector = core.useComponentCollector(context);
  const evalCalls: {
    node: TSESTree.CallExpression;
    func: ast.TSESTreeFunction;
  }[] = [];
  const withStatements: {
    node: TSESTree.WithStatement;
    func: ast.TSESTreeFunction;
  }[] = [];
  return defineRuleListener(
    hCollector.visitor,
    cCollector.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (!isEvalCall(node)) return;
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        evalCalls.push({ node, func });
      },
      WithStatement(node: TSESTree.WithStatement) {
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        withStatements.push({ node, func });
      },
      "JSXElement :function"(node: ast.TSESTreeFunction) {
        if (isIifeCall(node)) {
          context.report({
            messageId: "iife",
            node: node.parent as TSESTree.CallExpression,
          });
        }
      },
      "JSXFragment :function"(node: ast.TSESTreeFunction) {
        if (isIifeCall(node)) {
          context.report({
            messageId: "iife",
            node: node.parent as TSESTree.CallExpression,
          });
        }
      },
      "Program:exit"(node) {
        const components = cCollector.ctx.getAllComponents(node);
        const hooks = hCollector.ctx.getAllHooks(node);
        const funcs = [...components, ...hooks];
        for (const { node, func } of evalCalls) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "eval",
            node,
          });
        }
        for (const { node, func } of withStatements) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "with",
            node,
          });
        }
      },
    },
  );
}
