import * as ast from "@eslint-react/ast";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { HookSemanticNode } from "./hook-semantic-node";

import { isHookId } from "./hook-id";
import { isHookCall } from "./hook-is";

const idGen = new IdGenerator("hook:");

type FunctionEntry = {
  key: string;
  node: ast.TSESTreeFunction;
};

export declare namespace useHookCollector {
  type ReturnType = {
    ctx: {
      getAllHooks(node: TSESTree.Program): HookSemanticNode[];
      getCurrentEntries(): FunctionEntry[];
      getCurrentEntry(): FunctionEntry | null;
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get a ctx and visitor object for the rule to collect hooks
 * @param context The ESLint rule context
 * @returns The ctx and visitor of the collector
 */
export function useHookCollector(context: RuleContext): useHookCollector.ReturnType {
  const hooks = new Map<string, HookSemanticNode>();
  const functionEntries: FunctionEntry[] = [];
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const getCurrentEntry = () => functionEntries.at(-1) ?? null;
  const onFunctionEnter = (node: ast.TSESTreeFunction) => {
    const id = ast.getFunctionId(node);
    const key = idGen.next();
    functionEntries.push({ key, node });
    if (id == null || !isHookId(id)) return;
    hooks.set(key, {
      id,
      key,
      kind: "function",
      name: ast.getFullyQualifiedName(id, getText),
      directives: [],
      flag: 0n,
      hint: 0n,
      hookCalls: [],
      node,
    });
  };
  const onFunctionExit = () => {
    functionEntries.pop();
  };
  const ctx = {
    getAllHooks(node: TSESTree.Program) {
      return [...hooks.values()];
    },
    getCurrentEntries: () => functionEntries,
    getCurrentEntry,
  } as const;
  const visitor = {
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    CallExpression(node) {
      if (!isHookCall(node)) return;
      const entry = getCurrentEntry();
      if (entry == null) return;
      hooks.get(entry.key)?.hookCalls.push(node);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, visitor } as const;
}
