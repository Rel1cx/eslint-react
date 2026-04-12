import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import { ulid } from "ulid";

import { getFunctionId } from "./function";
import { type HookSemanticNode, isHookCall, isHookId } from "./hook";

interface FunctionEntry extends HookSemanticNode {
  isHookDefinition: boolean;
}

export declare namespace getHookCollector {
  type ReturnType = {
    api: {
      getAllHooks(node: TSESTree.Program): HookSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get an api and visitor object for the rule to collect hooks
 * @param context The ESLint rule context
 * @returns The api and visitor of the collector
 */
export function getHookCollector(context: RuleContext): getHookCollector.ReturnType {
  const hooks = new Map<string, HookSemanticNode>();
  const functionEntries: FunctionEntry[] = [];
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const getCurrentEntry = () => functionEntries.at(-1) ?? null;
  const onFunctionEnter = (node: ast.TSESTreeFunction) => {
    const id = getFunctionId(node);
    const key = ulid();
    const name = id == null ? null : ast.getFullyQualifiedName(id, getText);
    const entry = {
      id,
      key,
      kind: "hook",
      name,
      directives: [],
      flag: 0n,
      hint: 0n,
      hookCalls: [],
      isHookDefinition: id != null && isHookId(id),
      node,
      rets: [],
    } as const satisfies FunctionEntry;
    functionEntries.push(entry);
    if (!entry.isHookDefinition) return;
    hooks.set(key, entry);
  };
  const onFunctionExit = () => {
    functionEntries.pop();
  };
  const api = {
    getAllHooks(node: TSESTree.Program) {
      return [...hooks.values()];
    },
  } as const;
  const visitor = {
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    "ArrowFunctionExpression[body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const { body } = entry.node;
      if (body.type === AST.BlockStatement) return;
      entry.rets.push(body);
    },
    CallExpression(node) {
      if (!isHookCall(node)) return;
      const entry = getCurrentEntry();
      if (entry == null) return;
      entry.hookCalls.push(node);
    },
    ReturnStatement(node: TSESTree.ReturnStatement) {
      const entry = getCurrentEntry();
      if (entry == null) return;
      entry.rets.push(node.argument);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { api, visitor } as const;
}
