import { Check, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";
import { isEvalCall, isIifeCall } from "./lib";

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
      iife:
        "Do not use immediately-invoked function expressions in JSX. IIFEs will not be optimized by React Compiler.",
      with:
        "Do not use 'with' statements inside components or hooks. 'with' changes scope dynamically and is not supported by React Compiler.",
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
  const evalCalls: {
    func: TSESTreeFunction;
    node: TSESTree.CallExpression;
  }[] = [];
  const withStmts: {
    func: TSESTreeFunction;
    node: TSESTree.WithStatement;
  }[] = [];
  return merge(
    hc.visitor,
    fc.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (!isEvalCall(node)) return;
        const func = Traverse.findParent(node, Check.isFunction);
        if (func == null) return;
        evalCalls.push({ func, node });
      },
      "JSXElement :function"(node: TSESTreeFunction) {
        if (isIifeCall(node)) {
          context.report({
            messageId: "iife",
            node: node.parent as TSESTree.CallExpression,
          });
        }
      },
      "JSXFragment :function"(node: TSESTreeFunction) {
        if (isIifeCall(node)) {
          context.report({
            messageId: "iife",
            node: node.parent as TSESTree.CallExpression,
          });
        }
      },
      "Program:exit"(node) {
        const components = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...components, ...hooks];
        for (const { func, node } of evalCalls) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "eval",
            node,
          });
        }
        for (const { func, node } of withStmts) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "with",
            node,
          });
        }
      },
      WithStatement(node: TSESTree.WithStatement) {
        const func = Traverse.findParent(node, Check.isFunction);
        if (func == null) return;
        withStmts.push({ func, node });
      },
    },
  );
}
