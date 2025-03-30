import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Hook } from "./hook-semantic-node";
import * as AST from "@eslint-react/ast";

import { getId } from "@eslint-react/shared";
import { isReactHookName } from "./hook-name";
import { isReactHookCall } from "./is";

type FunctionEntry = {
  key: string;
  node: AST.TSESTreeFunction;
  isHook: boolean;
};

export declare namespace useHookCollector {
  type ReturnType = {
    ctx: {
      getAllHooks(node: TSESTree.Program): Map<string, Hook>;
    };
    listeners: ESLintUtils.RuleListener;
  };
}

export function useHookCollector(): useHookCollector.ReturnType {
  const hooks = new Map<string, Hook>();
  const functionEntries: FunctionEntry[] = [];
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const id = AST.getFunctionIdentifier(node);
    const key = getId();
    const name = id?.name;
    if (name != null && isReactHookName(name)) {
      functionEntries.push({ key, node, isHook: true });
      hooks.set(key, {
        id,
        key,
        kind: "function",
        name,
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
    getAllHooks(node: TSESTree.Program): typeof hooks {
      return hooks;
    },
  } as const;
  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "CallExpression[type]"(node) {
      if (!isReactHookCall(node)) {
        return;
      }
      const fEntry = functionEntries.at(-1);
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
  return { ctx, listeners } as const;
}
