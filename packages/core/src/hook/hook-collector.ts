import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { HookSemanticNode } from "./hook-semantic-node";

import { isHookId } from "./hook-id";
import { isHookCall } from "./hook-is";

const idGen = new IdGenerator("hook_");

type FunctionEntry = {
  key: string;
  node: AST.TSESTreeFunction;
  isHook: boolean;
};

export declare namespace useHookCollector {
  type ReturnType = {
    ctx: {
      getAllHooks(node: TSESTree.Program): HookSemanticNode[];
      getCurrentEntries(): FunctionEntry[];
      getCurrentEntry(): FunctionEntry | unit;
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
  const getCurrentEntry = () => functionEntries.at(-1);
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const id = AST.getFunctionId(node);
    const key = idGen.next();
    if (id != null && isHookId(id)) {
      functionEntries.push({ key, node, isHook: true });
      hooks.set(key, {
        id,
        key,
        kind: "function",
        name: AST.toStringFormat(id, getText),
        node,
        flag: 0n,
        hint: 0n,
        hookCalls: [],
      });
      return;
    }
    functionEntries.push({ key, node, isHook: false });
  };
  const onFunctionExit = () => {
    functionEntries.pop();
  };
  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      if (!isHookCall(node)) {
        return;
      }
      const fEntry = getCurrentEntry();
      if (fEntry?.key == null) {
        return;
      }
      const hook = hooks.get(fEntry.key);
      if (hook == null) {
        return;
      }
      hook.hookCalls.push(node);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, visitor } as const;
}
